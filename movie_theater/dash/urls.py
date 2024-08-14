from django.urls import path
from .views import *

app_name = "movie_theater"

urlpatterns = [
    path('list-movie/', list_movie, name="list-movie"),
]
