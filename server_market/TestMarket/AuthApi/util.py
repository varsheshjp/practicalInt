from django.shortcuts import render
from django.contrib.auth.signals import user_logged_in
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_jwt.utils import jwt_payload_handler
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ObjectDoesNotExist
import jwt
import json
from .models import User
from .serializers import UserSerializer
from TestMarket import settings
from django.core import serializers
from django.core.exceptions import ObjectDoesNotExist
def create_simple_login_token(email,password,request):
    print("here")
    try:
        user = User.objects.get(email=email)
        print("here")
        if user and user.check_password(password):
            try:
                print("here")
                payload = jwt_payload_handler(user)
                token = jwt.encode(payload, settings.SECRET_KEY)
                user_details = {}
                user_details['token'] = token
                user_details['login']=True
                user_logged_in.send(sender=user.__class__,request=request, user=user)
                return Response(user_details, status=status.HTTP_200_OK)
            except Exception as e:
                raise e
        else:
            res = {
                'error': 'can not authenticate with the given credentials or the account has been deactivated'}
            return Response(res, status=status.HTTP_403_FORBIDDEN)
    except ObjectDoesNotExist:
        res = {
            'error': 'can not authenticate with the given credentials or the account has been deactivated',
            'login':False}
        return Response(res, status=status.HTTP_403_FORBIDDEN)
def create_simple_regester_token(email,password,request):
    try:
        user = User.objects.get(email=email)
        if user and user.check_password(password):
            try:
                payload = jwt_payload_handler(user)
                token = jwt.encode(payload, settings.SECRET_KEY)
                user_details = {}
                user_details['token'] = token
                user_details['login']=True
                user_logged_in.send(sender=user.__class__,request=request, user=user)
                return Response(user_details, status=status.HTTP_201_CREATED)
            except Exception as e:
                raise e
        else:
            res = {
                'error': 'can not authenticate with the given credentials or the account has been deactivated'}
            return Response(res, status=status.HTTP_403_FORBIDDEN)
    except ObjectDoesNotExist:
        res = {
            'error': 'can not authenticate with the given credentials or the account has been deactivated',
            'login':False}
        return Response(res, status=status.HTTP_403_FORBIDDEN)