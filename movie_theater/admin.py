from django.contrib import admin
from .models import Genre, Movie, Rating

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'release_date', 'duration', 'director')
    list_filter = ('genres', 'release_date')
    search_fields = ('title', 'director', 'cast__name')
    filter_horizontal = ['genres']

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('user', 'movie', 'rating')
    list_filter = ('rating',)
    search_fields = ('user__username', 'movie__title')