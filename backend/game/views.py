import random
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Category, Question, UserProgress, Game, Team
from .serializers import CategorySerializer, QuestionSerializer, GameSerializer
from django.db.models import Count

class CategoryListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class QuestionListView(generics.ListAPIView):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        user = self.request.user
        answered_questions = UserProgress.objects.filter(user=user).values_list('question', flat=True)
        questions = Question.objects.filter(category_id=category_id).exclude(id__in=answered_questions)
        return questions.order_by('?')

class AnswerQuestionView(generics.CreateAPIView):
    serializer_class = QuestionSerializer

    def perform_create(self, serializer):
        user = self.request.user
        question = serializer.validated_data['question']
        UserProgress.objects.create(user=user, question=question)

class StartGameView(APIView):
    """
    POST endpoint to start a new game.
    Expects JSON:
    {
       "name": "Optional game name",
       "categories": [<category_id1>, ...],  // exactly 6 categories
       "teams": [<team_name1>, ...]           // between 2 and 4 non-empty team names.
    }
    Creates a new game, decrements user's game_count, and creates associated Team objects.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        category_ids = request.data.get('categories', [])
        teams = request.data.get('teams', [])
        
        if len(category_ids) != 6:
            return Response(
                {"detail": "Please select exactly 6 categories."},
                status=status.HTTP_400_BAD_REQUEST
            )
        if not (2 <= len(teams) <= 4):
            return Response(
                {"detail": "Please provide between 2 and 4 teams."},
                status=status.HTTP_400_BAD_REQUEST
            )
        if any(not team.strip() for team in teams):
            return Response(
                {"detail": "All teams must have a name."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = request.user
        if user.game_count <= 0:
            return Response(
                {"detail": "No games remaining."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Decrement game_count and save.
        user.game_count -= 1
        user.save()
        
        progress_data = {}
        for cat_id in category_ids:
            cat_data = {}
            for difficulty in ['easy', 'medium', 'hard']:
                qs = Question.objects.filter(category_id=cat_id, difficulty=difficulty)
                selected = list(qs.order_by('?').values_list('id', flat=True)[:2])
                if len(selected) < 2:
                    return Response(
                        {"detail": f"Not enough {difficulty} questions in category {cat_id}."},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                cat_data[difficulty] = {"selected": selected, "answered": []}
            progress_data[str(cat_id)] = cat_data
        
        game_name = request.data.get('name', f"Game by {user.username}")
        game = Game.objects.create(user=user, progress_data=progress_data, name=game_name)
        game.categories.set(Category.objects.filter(id__in=category_ids))
        game.save()
        
        # Create team objects.
        for team_name in teams:
            Team.objects.create(game=game, name=team_name)
        
        # Refresh game to load teams.
        game.refresh_from_db()
        serializer = GameSerializer(game, context={'request': request})
        print("Serialized Game Data (StartGame):", serializer.data)  # Debug print
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ResumeGameView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        print("Authenticated user (ResumeGame):", request.user)
        user = request.user
        # Get the most recent in-progress game.
        game = Game.objects.filter(user=user, status='in_progress')\
                .prefetch_related('teams', 'categories')\
                .order_by('-created_at')\
                .first()
        if not game:
            return Response({"detail": "No in-progress game found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = GameSerializer(game, context={'request': request})
        print("Serialized ResumeGame Data:", serializer.data)  # Debug print
        return Response(serializer.data, status=status.HTTP_200_OK)

class UpdateGameProgressView(APIView):
    """
    POST endpoint to update game progress and update team score.
    Expects JSON:
    {
       "game_id": <game_id>,
       "category_id": <category_id>,
       "difficulty": "easy" | "medium" | "hard",
       "question_id": <question_id>,
       "team_id": <team_id>,         # ID of the team answering
       "points_awarded": <integer>    # Points to add (or subtract)
    }
    Marks the question as answered, updates the team's score, and cycles turn.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        game_id = request.data.get("game_id")
        category_id = str(request.data.get("category_id"))
        difficulty = request.data.get("difficulty")
        question_id = request.data.get("question_id")
        team_id = request.data.get("team_id")
        points_awarded = request.data.get("points_awarded")
        
        if None in (game_id, category_id, difficulty, question_id, team_id, points_awarded):
            return Response({"detail": "Missing required fields."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            game = Game.objects.get(id=game_id, user=request.user, status="in_progress")
        except Game.DoesNotExist:
            return Response({"detail": "Game not found or already completed."}, status=status.HTTP_404_NOT_FOUND)
        
        progress_data = game.progress_data
        if category_id not in progress_data:
            return Response({"detail": "Category not found in game progress."}, status=status.HTTP_400_BAD_REQUEST)
        
        cat_data = progress_data[category_id]
        if difficulty not in cat_data:
            return Response({"detail": "Difficulty not found for category."}, status=status.HTTP_400_BAD_REQUEST)
        if question_id not in cat_data[difficulty]["selected"]:
            return Response({"detail": "Question not part of the selected questions."}, status=status.HTTP_400_BAD_REQUEST)
        if question_id in cat_data[difficulty]["answered"]:
            return Response({"detail": "Question already marked as answered."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Mark question as answered.
        cat_data[difficulty]["answered"].append(question_id)
        progress_data[category_id] = cat_data
        game.progress_data = progress_data
        
        # Update team score.
        try:
            team = game.teams.get(id=team_id)
        except Team.DoesNotExist:
            return Response({"detail": "Team not found in this game."}, status=status.HTTP_404_NOT_FOUND)
        try:
            points_awarded = int(points_awarded)
        except ValueError:
            return Response({"detail": "Invalid points_awarded value."}, status=status.HTTP_400_BAD_REQUEST)
        team.score += points_awarded
        team.save()
        
        # Cycle turn: update current_turn field.
        teams = list(game.teams.all().order_by('id'))
        if teams:
            game.current_turn = (game.current_turn + 1) % len(teams)
        
        # Check if game is complete.
        complete = True
        for cat, data in progress_data.items():
            for diff in ["easy", "medium", "hard"]:
                if len(data[diff]["answered"]) < len(data[diff]["selected"]):
                    complete = False
                    break
            if not complete:
                break
        if complete:
            game.status = "completed"
        game.save()
        
        response_data = {
            "detail": "Progress updated.",
            "game_id": game.id,
            "complete": complete,
            "teams": list(game.teams.values("id", "name", "score")),
            "current_turn": game.current_turn
        }
        print("Serialized UpdateGameProgress Data:", response_data)  # Debug print
        return Response(response_data, status=status.HTTP_200_OK)

class ListGamesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        print("Authenticated user (ListGames):", request.user)
        games = Game.objects.filter(user=request.user).prefetch_related('teams', 'categories').order_by('-created_at')
        serializer = GameSerializer(games, many=True, context={'request': request})
        print("Serialized Games List:", serializer.data)  # Debug print
        return Response(serializer.data, status=status.HTTP_200_OK)
