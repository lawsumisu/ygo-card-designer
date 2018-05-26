from rest_framework import serializers

from yugioh_django.card.models import Card


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('id', 'name')