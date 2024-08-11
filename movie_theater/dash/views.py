from django.shortcuts import render
from django.utils import translation
from django.utils.translation import get_language
from django.http import HttpResponse
from ..models import Movie

def list_movie(request):
    movies = Movie.objects.all()
    context = {
        'movies': movies,
    }
    return render(request, "movie_theater/movie/list/index.html", context)


def language(request, lang_code):
    translation.activate(lang_code)
    return HttpResponse(f"Idioma mudado para {lang_code}")