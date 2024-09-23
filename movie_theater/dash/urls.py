from django.urls import path
from .views import *

app_name = "movie_theater"

urlpatterns = [
    path('home/', home, name="home"),
    path('cinemas/', cinemas, name="cinemas"),
    path('movies/', movies, name="movies"),
    path('rooms/', rooms, name="rooms"),
    path('sessions/', sessions, name="sessions"),
    path('users/', users, name="users"),
]
