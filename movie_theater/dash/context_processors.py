from movie_theater.models import MovieTheater

def get_movies_theater(request):
    cinemas = MovieTheater.objects.only('id', 'name')
    return {'cinemas': cinemas}