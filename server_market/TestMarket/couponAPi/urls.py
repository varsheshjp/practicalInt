from django.urls import path
from .views import create_promo,delete,edit_promo,listofPromo

urlpatterns = [
    path('create', create_promo),
    path('update',edit_promo),
    path('get',listofPromo),
    path('delete',delete)
]