from django.urls import path
from . import views

urlpatterns = [
    path("", views.send_request, name="send_request")
]