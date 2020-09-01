from django.db import models
from django.db.models import Model
from django.utils import timezone
from django.db import transaction


class Order(Model):
    amount=models.IntegerField(default=0)
    usedPromo=models.CharField(max_length=128)
    totalDiscount=models.IntegerField(default=0)
    user_email=models.EmailField(max_length=40)
    objects = models.Manager()

class UsedPromoUser(Model):
    promoCode=models.CharField(max_length=128)
    user_email=models.EmailField(max_length=40)
    objects = models.Manager()