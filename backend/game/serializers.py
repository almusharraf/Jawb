from rest_framework import serializers
from .models import Category, Question, UserProgress

class CategorySerializer(serializers.ModelSerializer):
    image = serializers.ImageField(read_only=True)  # Added field to return the image URL

    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'image']  # Include the image field

class QuestionSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(read_only=True)  # Added image field for question
    video = serializers.FileField(read_only=True)    # Optional: include video if needed

    class Meta:
        model = Question
        fields = ['id', 'category', 'question_text', 'image', 'video', 'answer']

class UserProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProgress
        fields = ['user', 'question', 'date_answered']
