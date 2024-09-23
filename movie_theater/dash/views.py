from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from ..models import Genre
from ..api.choices import LANGUAGE_CHOICES, CLASSIFICATION_CHOICES

def home(request):
    return render(request, "movie_theater/home/index.html")

def cinemas(request):
    return render(request, "movie_theater/cinema/index.html")

def movies(request):
    genres = Genre.objects.all()
    languages = LANGUAGE_CHOICES
    classifications = CLASSIFICATION_CHOICES

    context = {
        'genres': genres,
        'languages': languages,
        'classifications': classifications,
    }
    

    return render(request, "movie_theater/movie/index.html", context)

def rooms(request):
    return render(request, "movie_theater/room/index.html")

def sessions(request):
    return render(request, "movie_theater/session/index.html")

def users(request):
    return render(request, "movie_theater/user/index.html")