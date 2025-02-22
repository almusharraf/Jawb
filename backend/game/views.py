# game/views.py
import random
from rest_framework import generics
from rest_framework.response import Response
from .models import Category, Question, UserProgress
from .serializers import CategorySerializer, QuestionSerializer
from django.db.models import Count

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class QuestionListView(generics.ListAPIView):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        user = self.request.user
        # Get all unanswered questions for the user in this category
        answered_questions = UserProgress.objects.filter(user=user).values_list('question', flat=True)
        questions = Question.objects.filter(category_id=category_id).exclude(id__in=answered_questions)
        return questions.order_by('?')  # Return a random question

class AnswerQuestionView(generics.CreateAPIView):
    serializer_class = QuestionSerializer

    def perform_create(self, serializer):
        user = self.request.user
        question = serializer.validated_data['question']
        UserProgress.objects.create(user=user, question=question)
