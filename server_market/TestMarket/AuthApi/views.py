from django.shortcuts import render
from django.contrib.auth.signals import user_logged_in
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from TestMarket import settings
from django.core import serializers
import requests
import json
from .util import create_simple_login_token,create_simple_regester_token
@api_view(['POST'])
@permission_classes([AllowAny, ])
def authenticate_user(request):
   
    try:
        email = request.data['Email']
        password = request.data['Password']
        print(email,password)
        return create_simple_login_token(email,password,request)
        
    except KeyError:
        res = {'error': 'please provide a email and a password'}
        return Response(res)

@api_view(['POST'])
@permission_classes([AllowAny, ])
def create_user(request):
    user = request.data
    serializer = UserSerializer(data=user)
    serializer.is_valid(raise_exception=True)
    instance = serializer.save()
    password=instance.password
    instance.set_password(instance.password)
    instance.save()
    return create_simple_regester_token(instance.email,password,request)

@api_view(['get'])
@permission_classes([IsAuthenticated,])
def users_list(request):
    if request.user.is_superuser:
        try:
            users=User.objects.filter(is_superuser=False)
        except Exception as e:
            print(e)
        data=serializers.serialize('json',users)
        return Response(data)