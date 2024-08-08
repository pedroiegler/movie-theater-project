from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import GenreViewSet, MovieViewSet, RatingViewSet, CommentViewSet, AddressViewSet, MovieTheaterViewSet

router = DefaultRouter()
router.register(r'genre', GenreViewSet)
router.register(r'movie', MovieViewSet)
router.register(r'rating', RatingViewSet)
router.register(r'comment', CommentViewSet)
router.register(r'address', AddressViewSet)
router.register(r'movie-theater', MovieTheaterViewSet)

urlpatterns = router.urls
