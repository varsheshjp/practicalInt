from django.shortcuts import render
from django.contrib.auth.signals import user_logged_in
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
import json
from TestMarket import settings
from django.core import serializers
from django.core.exceptions import ObjectDoesNotExist
from couponAPi.models import Promo
from AuthApi.models import User
from datetime import *
from .models import UsedPromoUser
def promoExist(promocode):
    try:
        promo=Promo.objects.get(promoCode=promocode)
        return True
    except ObjectDoesNotExist:
        return False
def promoApplicableOnGender(user_email,promocode):
    user=User.objects.get(email=user_email)
    promo=Promo.objects.get(promoCode=promocode)
    if(user.gender==promo.gender):
        return True
    else:
        return False
def promoApplicableInRange(user_email,promocode):
    d=date.today()
    promo=Promo.objects.get(promoCode=promocode)
    startDate=promo.startDate
    endDate=promo.endDate
    if d<endDate and d>startDate:
        return True
    else: 
        return False

def promoApplicableOnBirthday(user_email,promocode):
    user=User.objects.get(email=user_email)
    if date.today()==user.birthdate:
        return True
    else:
        return False
def promoForUser(user_email,promocode):
    count=UsedPromoUser.objects.filter(user_email=user_email,promoCode=promocode).count()
    promo=Promo.objects.get(promoCode=promocode)
    if count<promo.maxLimitUser:
        return True
    else:
        return False
def promoExceep(promocode):
    promo=Promo.objects.get(promoCode=promocode)
    if promo.usedPromo<promo.maxPromo:
        return True
    else:
        return False