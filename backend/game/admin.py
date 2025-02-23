from django.contrib import admin
from .models import Category, Question

class QuestionInline(admin.TabularInline):
    model = Question
    extra = 1  # Number of extra blank forms for new questions

class CategoryAdmin(admin.ModelAdmin):
    inlines = [QuestionInline]
    list_display = ('name', 'description')

admin.site.register(Category, CategoryAdmin)
admin.site.register(Question)
