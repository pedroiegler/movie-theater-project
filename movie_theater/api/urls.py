from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from .views import *
from .payment import *

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
router.register(r'user', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),   
    path('login/', obtain_auth_token, name="login"),   
    path('logout/', LogoutView.as_view(), name="logout"),   

    #Payment
    path('make-payment/', PaymentView.as_view(), name='payment'),
]