from rest_framework import serializers
from ..models import Genre, Movie

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

class MovieSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True)
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = ['id', 'title', 'description', 'release_date', 'duration', 'genres', 'director', 'cast', 'poster', 'trailer_url', 'average_rating']
    
    def create(self, validated_data):
        genres_data = validated_data.pop('genres', [])
        movie = Movie.objects.create(**validated_data)
        
        for genre_data in genres_data:
            genre, created = Genre.objects.get_or_create(**genre_data)
            movie.genres.add(genre)
        
        return movie
    
    def get_average_rating(self, obj):
        return obj.average_rating()

    