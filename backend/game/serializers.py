from rest_framework import serializers
from .models import Category, Question, UserProgress, Game, Team

class CategorySerializer(serializers.ModelSerializer):
    image = serializers.ImageField(read_only=True)
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'image']

class QuestionSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(read_only=True)
    video = serializers.FileField(read_only=True)
    class Meta:
        model = Question
        fields = ['id', 'category', 'question_text', 'image', 'video', 'answer', 'difficulty']

class UserProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProgress
        fields = ['user', 'question', 'date_answered']

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name', 'score']

class GameSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    teams = TeamSerializer(many=True, read_only=True)
    class Meta:
        model = Game
        fields = ['id', 'user', 'name', 'categories', 'teams', 'status', 'progress_data', 'current_turn', 'created_at', 'updated_at']
