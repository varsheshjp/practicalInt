from django.urls import path
from .views import create_user,authenticate_user,users_list
 
urlpatterns = [
    path('register', create_user),
    path('login',authenticate_user),
    path('get',users_list)
]