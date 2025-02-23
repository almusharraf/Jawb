from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='category_images/', blank=True, null=True)
    video = models.FileField(upload_to='category_videos/', blank=True, null=True)  # optional video

    def __str__(self):
        return self.name

class Question(models.Model):
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ]
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='questions')
    question_text = models.CharField(max_length=500)
    image = models.ImageField(upload_to='question_images/', blank=True, null=True)
    video = models.FileField(upload_to='question_videos/', blank=True, null=True)
    answer = models.CharField(max_length=500)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES, default='easy')

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

# New Team model for storing teams within a game.
class Team(models.Model):
    name = models.CharField(max_length=100)
    game = models.ForeignKey('Game', on_delete=models.CASCADE, related_name='teams')

    def __str__(self):
        return self.name

# Updated Game model with a name field.
class Game(models.Model):
    name = models.CharField(max_length=255)  # New field for the game name
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='games')
    categories = models.ManyToManyField(Category)
    status = models.CharField(
        max_length=20,
        choices=[('in_progress', 'In Progress'), ('completed', 'Completed')],
        default='in_progress'
    )
    # progress_data stores each category’s selected questions by difficulty and which ones are answered.
    # Structure example:
    # {
    #   "<cat_id>": {
    #         "easy": {"selected": [q_id1, q_id2], "answered": []},
    #         "medium": {"selected": [q_id3, q_id4], "answered": []},
    #         "hard": {"selected": [q_id5, q_id6], "answered": []}
    #   },
    #   ...
    # }
    progress_data = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Game {self.id} ({self.name}) for {self.user} - {self.status}"
