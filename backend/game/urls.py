from django.urls import path
from .views import (
    CategoryListView,
    QuestionListView,
    AnswerQuestionView,
    StartGameView,
    ResumeGameView,
    UpdateGameProgressView,
)

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('questions/<int:category_id>/', QuestionListView.as_view(), name='question-list'),
    path('answer/', AnswerQuestionView.as_view(), name='answer-question'),
    path('start-game/', StartGameView.as_view(), name='start-game'),
    path('resume-game/', ResumeGameView.as_view(), name='resume-game'),
    path('update-game-progress/', UpdateGameProgressView.as_view(), name='update-game-progress'),
]
