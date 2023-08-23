from rest_framework import serializers
from .models import Equip, Match, Prediction
from django.conf import settings


class EquipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equip
        fields = ('name', 'id', 'logo', 'group')


class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ('equip_a', 'equip_b', 'id', 'date', 'state', 'played', 'score')

class PredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prediction
        fields = ('id', 'match', 'user', 'score_a', 'score_b')