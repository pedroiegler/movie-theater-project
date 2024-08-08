from rest_framework import serializers
from ..models import Genre, Movie, Rating, Comment, Address, MovieTheater

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = "__all__"

class MovieSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True)
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = ['id', 'title', 'description', 'release_date', 'duration', 'genres', 'director', 'cast', 'poster', 'trailer_url', 'average_rating', 'classification', 'language']
    
    def create(self, validated_data):
        genres_data = validated_data.pop('genres', [])
        movie = Movie.objects.create(**validated_data)
        
        for genre_data in genres_data:
            genre, created = Genre.objects.get_or_create(**genre_data)
            movie.genres.add(genre)
        
        return movie
    
    def get_average_rating(self, obj):
        return obj.average_rating()
    
class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = "__all__"

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"

class MovieTheaterSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = MovieTheater
        fields = "__all__"

    def create(self, validated_data):
        address_data = validated_data.pop("address", None)
        if address_data:
            address_instance = Address.objects.create(**address_data)
            validated_data["address"] = address_instance
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        address_data = validated_data.pop("address", None)
        if address_data:
            if instance.address:
                address_instance = instance.address
                for key, value in address_data.items():
                    setattr(address_instance, key, value)
                address_instance.save()
            else:
                address_instance = Address.objects.create(**address_data)
                validated_data["address"] = address_instance
        return super().update(instance, validated_data)
