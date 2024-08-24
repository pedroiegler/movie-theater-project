from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.contrib.auth.models import User
from ..models import *

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = "__all__"

class MovieSerializer(serializers.ModelSerializer):
    genres = serializers.PrimaryKeyRelatedField(queryset=Genre.objects.all(), many=True)
    average_rating = serializers.SerializerMethodField()
    poster = serializers.ImageField(required=False) 

    class Meta:
        model = Movie
        fields = ['id', 'title', 'description', 'release_date', 'duration', 'genres', 'director', 'cast', 'poster', 'trailer_url', 'average_rating', 'classification', 'language', 'in_theaters']
    
    def create(self, validated_data):
        genres_data = validated_data.pop('genres', [])
        movie = Movie.objects.create(**validated_data)
        
        movie.genres.set(genres_data)  # Adiciona os IDs diretamente à relação ManyToMany
        
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

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"
        
class TicketPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketPrice
        fields = "__all__"

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = "__all__"

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = "__all__"

class ReservedSeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReservedSeat
        fields = "__all__"

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        refresh_token = attrs.get('refresh')
        if not refresh_token:
            raise serializers.ValidationError("Refresh token is required.")
        self.token = refresh_token
        return attrs
    
    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError as e:
            if 'Token is blacklisted' in str(e):
                self.fail('token_blacklisted', error_message="The provided refresh token has already been blacklisted.")
            elif 'Token is expired' in str(e):
                self.fail('token_expired', error_message="The provided refresh token has expired.")
            else:
                self.fail('token_invalid', error_message="The provided refresh token is invalid.")
    
    def fail(self, key, **kwargs):
        error_messages = {
            'token_blacklisted': kwargs.get('error_message', 'The token is blacklisted.'),
            'token_expired': kwargs.get('error_message', 'The token has expired.'),
            'token_invalid': kwargs.get('error_message', 'The token is invalid.')
        }
        raise serializers.ValidationError(error_messages.get(key, 'Invalid token.'))