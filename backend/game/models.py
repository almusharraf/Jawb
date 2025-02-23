from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='category_images/', blank=True, null=True)
    video = models.FileField(upload_to='category_videos/', blank=True, null=True)  # optional video for category

    def __str__(self):
        return self.name

class Question(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='questions')
    question_text = models.CharField(max_length=500)
    image = models.ImageField(upload_to='question_images/', blank=True, null=True)
    video = models.FileField(upload_to='question_videos/', blank=True, null=True)  # new video field for question
    answer = models.CharField(max_length=500)

    def __str__(self):
        return self.question_text

class UserProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    date_answered = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'question')

    def __str__(self):
        return f"{self.user} - {self.question}"
