import random
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Category, Question, UserProgress, Game
from .serializers import CategorySerializer, QuestionSerializer, GameSerializer
from django.db.models import Count

class CategoryListView(generics.ListAPIView):
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
       "categories": [<category_id1>, <category_id2>, ...]  // must be exactly 6 categories
    }
    For each category, selects 2 easy, 2 medium, and 2 hard questions (if available)
    and stores their IDs in progress_data.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        category_ids = request.data.get('categories', [])
        if len(category_ids) != 6:
            return Response(
                {"detail": "Please select exactly 6 categories."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = request.user

        progress_data = {}
        for cat_id in category_ids:
            cat_data = {}
            for difficulty in ['easy', 'medium', 'hard']:
                qs = Question.objects.filter(category_id=cat_id, difficulty=difficulty)
                # Randomly select 2 questions if available
                selected = list(qs.order_by('?').values_list('id', flat=True)[:2])
                if len(selected) < 2:
                    return Response(
                        {"detail": f"Not enough {difficulty} questions in category {cat_id}."},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                cat_data[difficulty] = {"selected": selected, "answered": []}
            progress_data[str(cat_id)] = cat_data

        # Create a new game session
        game = Game.objects.create(user=user, progress_data=progress_data)
        # Add the chosen categories
        game.categories.set(Category.objects.filter(id__in=category_ids))
        game.save()

        serializer = GameSerializer(game, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ResumeGameView(APIView):
    """
    GET endpoint to resume the current in-progress game for the authenticated user.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        game = Game.objects.filter(user=user, status='in_progress').first()
        if not game:
            return Response({"detail": "No in-progress game found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = GameSerializer(game, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

class UpdateGameProgressView(APIView):
    """
    POST endpoint to update game progress.
    Expects JSON:
    {
       "game_id": <game_id>,
       "category_id": <category_id>,
       "difficulty": "easy" | "medium" | "hard",
       "question_id": <question_id>
    }
    Marks the given question as answered in the game progress.
    If all questions are answered, marks the game as completed.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        game_id = request.data.get("game_id")
        category_id = str(request.data.get("category_id"))
        difficulty = request.data.get("difficulty")
        question_id = request.data.get("question_id")

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
        
        cat_data[difficulty]["answered"].append(question_id)
        progress_data[category_id] = cat_data
        game.progress_data = progress_data

        # Check if all questions in all categories are answered
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
            # Optionally, perform any cleanup or post-game logic here.
        game.save()
        return Response({"detail": "Progress updated.", "game_id": game.id, "complete": complete}, status=status.HTTP_200_OK)
