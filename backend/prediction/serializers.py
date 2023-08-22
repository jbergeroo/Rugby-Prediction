from rest_framework import serializers
from .models import Equip
from django.conf import settings


class EquipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equip
        fields = ('name', 'id', 'logo', 'group')