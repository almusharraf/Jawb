# game/urls.py
from django.urls import path
from .views import CategoryListView, QuestionListView, AnswerQuestionView

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('questions/<int:category_id>/', QuestionListView.as_view(), name='question-list'),
    path('answer/', AnswerQuestionView.as_view(), name='answer-question'),
]
