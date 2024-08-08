from rest_framework import viewsets
from ..models import Genre, Movie, Rating, Comment, Address, MovieTheater
from .serializers import GenreSerializer, MovieSerializer, RatingSerializer, CommentSerializer, AddressSerializer, MovieTheaterSerializer

class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

class MovieTheaterViewSet(viewsets.ModelViewSet):
    queryset = MovieTheater.objects.all()
    serializer_class = MovieTheaterSerializer