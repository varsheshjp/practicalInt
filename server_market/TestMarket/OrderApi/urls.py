from django.urls import path
from .views import creatOrder,CheckApplicablePromo,getAllOrders
 
urlpatterns = [
    path('create', creatOrder),
    path('check',CheckApplicablePromo),
    path('get',getAllOrders)
]