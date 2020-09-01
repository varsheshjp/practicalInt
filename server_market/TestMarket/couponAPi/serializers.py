from rest_framework import serializers
from .models import Promo
class PromoSerializer(serializers.ModelSerializer):
    class Meta(object):
        model=Promo
        fields=('id','promoCode','startDate','endDate','maxLimitUser','maxPromo','price','gender')