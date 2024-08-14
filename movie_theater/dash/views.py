from django.shortcuts import render
from django.utils import translation
from django.utils.translation import get_language
from django.http import HttpResponse
from ..models import Movie

def list_movie(request):
    return render(request, "movie_theater/movie/list/index.html")