# accounts/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # Add a field to track the number of games a user has
    game_count = models.IntegerField(default=1)

    def __str__(self):
        return self.email
