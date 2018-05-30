import re

from rest_framework import serializers

from yugioh_django.cards.models import Card


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('id', 'name', 'attribute', 'attack', 'defense', 'lore', 'effect')

    id = serializers.UUIDField(read_only=True)
    name = serializers.CharField(required=True)
    attribute = serializers.CharField(required=True)
    attack = serializers.CharField(allow_null=True, required=False)
    defense = serializers.CharField(allow_null=True, required=False)

    def _validate_battle_value(self, value):
        return re.match('[0-9]+|\?', value)

    def validate_attack(self, attack):
        if attack is None:
            return attack
        if not self._validate_battle_value(attack):
            raise serializers.ValidationError('{} is an invalid attack value'.format(attack))
        return attack

    def validate_defense(self, defense):
        if defense is None:
            return defense
        if not self._validate_battle_value(defense):
            raise serializers.ValidationError('{} is an invalid defense value'.format(defense))
        return defense

    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)
