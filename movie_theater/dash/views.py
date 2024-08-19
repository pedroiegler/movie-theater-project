from django.shortcuts import render
from django.utils import translation
from django.utils.translation import get_language
from django.http import HttpResponse
from ..models import Genre
from ..api.choices import LANGUAGE_CHOICES, CLASSIFICATION_CHOICES

def list_movie(request):
    genres = Genre.objects.all()
    languages = LANGUAGE_CHOICES
    classifications = CLASSIFICATION_CHOICES

    context = {
        'genres': genres,
        'languages': languages,
        'classifications': classifications,
    }
    

    return render(request, "movie_theater/movie/list/index.html", context)