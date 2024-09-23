from movie_theater.models import MovieTheater

def get_movies_theater(request):
    cinemas = MovieTheater.objects.only('id', 'name')
    return {'cinemas': cinemas}

def is_authenticated(request):
    is_authenticated = request.user.is_authenticated
    return {'is_authenticated': is_authenticated}

def get_authorized_user(request):
    is_authorized = request.user.is_staff or request.user.is_superuser
    return {'is_authorized': is_authorized}

def get_info_user(request):
    if request.user.is_authenticated:
        user = request.user
        first_name = user.first_name
        last_name = user.last_name
        email = user.email
    else:
        first_name = ''
        last_name = ''
        email = ''

    return {
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
    }