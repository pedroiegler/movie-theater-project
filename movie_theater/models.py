from django.db import models
from django.contrib.auth.models import User
from movie_theater.api.choices import *

class Address(models.Model):
    street = models.CharField(max_length=255, null=False, blank=False)
    number = models.PositiveIntegerField(null=False, blank=False)
    neighborhood = models.CharField(max_length=255, null=False, blank=False)
    city = models.CharField(max_length=100, null=False, blank=False)
    state = models.CharField(max_length=100, null=False, blank=False)
    country = models.CharField(max_length=100, null=False, blank=False)
    zip_code = models.CharField(max_length=10, null=False, blank=False)

    def __str__(self):
        return f"{self.street}, {self.number} - {self.city}, {self.state}"
    
    class Meta:
        ordering = ['street']

class MovieTheater(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['updated_on']

class Genre(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)
    movie_theater = models.ForeignKey(MovieTheater, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['updated_on']
    
class Movie(models.Model):
    title = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    release_date = models.DateField(null=False, blank=False)
    duration = models.PositiveIntegerField(help_text="Duration in minutes", null=False, blank=False)
    genres = models.ManyToManyField(Genre)
    director = models.CharField(max_length=100, null=True, blank=True)
    cast = models.TextField(help_text="Comma-separated list of actor names", null=True, blank=True)
    poster = models.ImageField(upload_to='movie_theater/uploaded_images/posters', null=True, blank=True)
    trailer_url = models.URLField(blank=True, null=True)
    in_theaters = models.BooleanField(default=False)
    classification = models.CharField(max_length=10, null=False, blank=False, choices=CLASSIFICATION_CHOICES)
    language = models.CharField(max_length=50, null=True, blank=True, choices=LANGUAGE_CHOICES)
    movie_theater = models.ForeignKey(MovieTheater, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def average_rating(self):
        ratings = Rating.objects.filter(movie=self)
        if ratings.exists():
            return ratings.aggregate(models.Avg('rating'))['rating__avg']
        return 0
    
    class Meta:
        ordering = ['updated_on']
    
class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    rating = models.DecimalField(max_digits=2, decimal_places=1, help_text="Rating out of 5", null=True, blank=True)
    movie_theater = models.ForeignKey(MovieTheater, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.movie.title} - {self.rating}"
    
    class Meta:
        unique_together = ('user', 'movie')
        ordering = ['updated_on']
    
class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    text = models.TextField(null=False, blank=False)
    movie_theater = models.ForeignKey(MovieTheater, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.movie.title}"
    
    class Meta:
        ordering = ['updated_on']

class Room(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    movie_theater = models.ForeignKey(MovieTheater, on_delete=models.CASCADE)
    total_seats = models.PositiveIntegerField(null=False, blank=False)
    movie_theater = models.ForeignKey(MovieTheater, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['updated_on']
    
class TicketPrice(models.Model):
    full_ticket_price = models.DecimalField(max_digits=6, decimal_places=2, null=False, blank=False)
    half_ticket_price = models.DecimalField(max_digits=6, decimal_places=2, null=False, blank=False)
    movie_theater = models.ForeignKey(MovieTheater, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Full: {self.full_ticket_price}, Half: {self.half_ticket_price}"
    
    class Meta:
        ordering = ['updated_on']
    
class Session(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    date = models.DateField(null=False, blank=False)
    time = models.TimeField(null=False, blank=False)
    available_seats = models.PositiveIntegerField(null=False, blank=False)
    ticket_price = models.ForeignKey(TicketPrice, on_delete=models.CASCADE)
    format = models.CharField(max_length=10, choices=FORMAT_CHOICES, default='2D')
    movie_theater = models.ForeignKey(MovieTheater, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.movie.title} - {self.room.name} - {self.time}"
    
    class Meta:
        ordering = ['updated_on']
    
class Reservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    full_tickets = models.PositiveIntegerField(default=0, null=False, blank=False)
    half_tickets = models.PositiveIntegerField(default=0, null=False, blank=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='confirmed')
    movie_theater = models.ForeignKey(MovieTheater, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.session.movie.title} - {self.full_tickets + self.half_tickets} tickets"
    
    class Meta:
        ordering = ['updated_on']

    @property
    def total_cost(self):
        full_price = self.session.ticket_price.full_ticket_price
        half_price = self.session.ticket_price.half_ticket_price
        return (self.full_tickets * full_price) + (self.half_tickets * half_price)
    
class ReservedSeat(models.Model):
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE, related_name='reserved_seats')
    seat = models.CharField(max_length=20, null=False, blank=False)
    is_half_ticket = models.BooleanField(default=False)
    document = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return f"{self.reservation.user.username} - {self.seat} - {'Half' if self.is_half_ticket else 'Full'}"
    

class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='pending')
    transaction_id = models.CharField(max_length=100, blank=True, null=True, unique=True)
    movie_theater = models.ForeignKey(MovieTheater, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.reservation} - {self.amount} - {self.status}"

    class Meta:
        ordering = ['updated_on']