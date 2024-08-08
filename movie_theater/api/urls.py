from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'genre', GenreViewSet)
router.register(r'movie', MovieViewSet)
router.register(r'rating', RatingViewSet)
router.register(r'comment', CommentViewSet)
router.register(r'address', AddressViewSet)
router.register(r'movie-theater', MovieTheaterViewSet)
router.register(r'ticket-price', TicketPriceViewSet)
router.register(r'room', RoomViewSet)
router.register(r'session', SessionViewSet)
router.register(r'reservation', ReservationViewSet)
router.register(r'reserved-seat', ReservedSeatViewSet)
router.register(r'payment', PaymentViewSet)

urlpatterns = router.urls
