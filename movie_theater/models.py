from django.db import models
from django.contrib.auth.models import User

class Genre(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Movie(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    release_date = models.DateField()
    duration = models.PositiveIntegerField(help_text="Duration in minutes")
    genres = models.ManyToManyField(Genre)
    director = models.CharField(max_length=100)
    cast = models.TextField(help_text="Comma-separated list of actor names")
    poster = models.ImageField(upload_to='posters')
    trailer_url = models.URLField(blank=True, null=True)
    in_theaters = models.BooleanField(default=False)
    classification = models.CharField(max_length=10)
    created_on = models.DateTimeField(auto_now_add=True)
    update_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def average_rating(self):
        ratings = Rating.objects.filter(movie=self)
        if ratings.exists():
            return ratings.aggregate(models.Avg('rating'))['rating__avg']
        return 0
    
class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    rating = models.DecimalField(max_digits=2, decimal_places=1, help_text="Rating out of 5")
    created_on = models.DateTimeField(auto_now_add=True)
    update_on = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'movie')

    def __str__(self):
        return f"{self.user.username} - {self.movie.title} - {self.rating}"
