from django.db import models
from django.db.models import Model
from django.utils import timezone
from django.db import transaction

class Promo(Model):
    promoCode=models.CharField(max_length=128,unique=True)
    startDate=models.DateField()
    endDate=models.DateField()
    maxLimitUser=models.IntegerField()
    maxPromo=models.IntegerField()
    usedPromo=models.IntegerField()
    price=models.IntegerField(default=0)
    gender=models.CharField(max_length=10,default="")
    creator_email=models.EmailField(max_length=40)
    objects = models.Manager()
