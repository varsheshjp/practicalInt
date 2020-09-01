from django.shortcuts import render
from django.shortcuts import render
from django.contrib.auth.signals import user_logged_in
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from TestMarket import settings
from django.core import serializers
import json
from .models import Order,UsedPromoUser
from .serializers import OrderSerializer
from .util import *
@api_view(['POST'])
@permission_classes([IsAuthenticated,])
def creatOrder(request):
    order = request.data
    serializer = OrderSerializer(data=order)
    serializer.is_valid(raise_exception=True)
    instance = serializer.save()
    if not instance.usedPromo=="none":
        pu=UsedPromoUser(promoCode=instance.usedPromo,user_email=instance.user_email)
        pu.save()
        promo=Promo.objects.get(promoCode=instance.usedPromo)
        promo.usedPromo=+1
        if(promoApplicableOnBirthday(instance.user_email,instance.usedPromo)):
            instance.totalDiscount=promo.price+10
        else:
            instance.totalDiscount=promo.price
        instance.save()
        promo.save()
    else:
        instance.totalDiscount=0
        instance.save()
    return Response("done",status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated,])
def CheckApplicablePromo(request):
    print(request.data)
    user_email=request.data["user_email"]
    promocode=request.data["promoCode"]
    if(promoExist(promocode)):
        ans={}
        ans['valid']=True
        if(promoExceep(promocode)):
            ans["totalCount"]=True 
            if (promoForUser(user_email,promocode)):
                ans['count']=True
                if(promoApplicableOnGender(user_email,promocode)):
                    ans['gender']=True
                    if(promoApplicableInRange(user_email,promocode)):
                        ans['range']=True
                        if(promoApplicableOnBirthday(user_email,promocode)):
                            ans['bday']=True
                            promo=Promo.objects.get(promoCode=promocode)
                            ans['discount']=promo.price+10
                        else:
                            ans['bday']=False
                            ans['discount']=promo.price
                    else:
                        ans['range']=False
                else:
                    ans['gender']=False
            else:
                ans['count']=False
        else:
            ans["totalCount"]=False    
        return Response(ans,status=status.HTTP_201_CREATED)
    else:
        ans={}
        ans['valid']=False
        return Response(ans,status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated,])
def getAllOrders(request):
    if request.user.is_superuser:
        try:
            order=Order.objects.all()
        except Exception as e:
            print(e)
        data=serializers.serialize('json',order)
        return Response(data)
