from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import GenreViewSet, MovieViewSet, RatingViewSet

router = DefaultRouter()
router.register(r'genres', GenreViewSet)
router.register(r'movies', MovieViewSet)
router.register(r'ratings', RatingViewSet)

urlpatterns = router.urls
