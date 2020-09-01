from rest_framework import serializers
from .models import Order,UsedPromoUser
class OrderSerializer(serializers.ModelSerializer):
    class Meta(object):
        model=Order
        fields=('amount','usedPromo','totalDiscount','user_email')
class PUSerializer(serializers.ModelSerializer):
    class Meta(object):
        model=UsedPromoUser
        fields=('promoCode','user_email')