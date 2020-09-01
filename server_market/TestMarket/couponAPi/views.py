from django.shortcuts import render
from django.shortcuts import render
from django.contrib.auth.signals import user_logged_in
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Promo
from .serializers import PromoSerializer
from TestMarket import settings
from django.core import serializers
import json
@api_view(['POST'])
@permission_classes([IsAuthenticated,])
def create_promo(request):
    user_email=request.user.email
    print(request.user.email,request.data)
    promo=Promo()
    promo.creator_email=user_email
    promo.promoCode=request.data['promoCode']
    promo.startDate=request.data['startDate']
    promo.endDate=request.data['endDate']
    promo.maxLimitUser=request.data['maxLimitUser']
    promo.maxPromo=request.data['maxPromo']
    promo.price=request.data['price']
    promo.gender=request.data['gender']
    promo.usedPromo=0
    promo.save()
    return Response("{'msg':'done'}", status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated,])
def edit_promo(request):
    user_email=request.user.email
    promo=Promo.objects.get(id=request.data['id'],creator_email=user_email)
    promo.promoCode=request.data['promoCode']
    promo.startDate=request.data['startDate']
    promo.endDate=request.data['endDate']
    promo.maxLimitUser=request.data['maxLimitUser']
    promo.maxPromo=request.data['maxPromo']
    promo.price=request.data['price']
    promo.gender=request.data['gender']
    promo.save()
    return Response("{'msg':'done'}", status=status.HTTP_202_ACCEPTED)
@api_view(['GET'])
@permission_classes([IsAuthenticated,])
def listofPromo(request):
    user_email=request.user.email
    promo=Promo.objects.filter(creator_email=user_email)
    promo=serializers.serialize('json', promo)
    return Response(promo, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated,])
def delete(request):
    user_email=request.user.email
    ans=Promo.objects.filter(id=request.data['id'],creator_email=user_email).delete()
    return Response("{'msg':'done'}", status=status.HTTP_202_ACCEPTED)

