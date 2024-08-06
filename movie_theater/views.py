from django.shortcuts import render

def home(request):
    return render(request, 'movie_theater/global/base.html')