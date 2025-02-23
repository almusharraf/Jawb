# game/management/commands/populate_fake_data.py
from django.core.management.base import BaseCommand
from game.models import Category, Question
import random

class Command(BaseCommand):
    help = 'Populates the database with fake categories and questions'

    def handle(self, *args, **options):
        # Define difficulties and number of categories
        difficulties = ['easy', 'medium', 'hard']
        num_categories = 6  # Creating exactly 6 categories

        for i in range(1, num_categories + 1):
            category, created = Category.objects.get_or_create(
                name=f"Category {i}",
                defaults={
                    'description': f"This is a description for Category {i}",
                    # You can also set image or video here if desired
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Created category: {category.name}"))
            else:
                self.stdout.write(f"Category already exists: {category.name}")

            # For each difficulty, create 2 questions if they don't already exist
            for diff in difficulties:
                for j in range(1, 3):  # Two questions per difficulty
                    question_text = f"Question {j} ({diff}) for {category.name}"
                    answer = f"Answer {j} for {category.name}"
                    question, q_created = Question.objects.get_or_create(
                        category=category,
                        question_text=question_text,
                        difficulty=diff,
                        defaults={
                            'answer': answer,
                            # Optionally set image or video fields here
                        }
                    )
                    if q_created:
                        self.stdout.write(self.style.SUCCESS(f"  Created question: {question.question_text}"))
                    else:
                        self.stdout.write(f"  Question already exists: {question.question_text}")

        self.stdout.write(self.style.SUCCESS("Fake data populated successfully."))
