# Generated by Django 5.1.6 on 2025-02-23 20:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0007_team_score'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='current_turn',
            field=models.IntegerField(default=0),
        ),
    ]
