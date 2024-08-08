from django.urls import path
from .views import login, dash

urlpatterns = [
    path("login/", login, name="login"),
    path("dash/", dash, name="dash"),
]
