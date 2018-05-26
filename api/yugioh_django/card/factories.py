from factory.django import DjangoModelFactory

from yugioh_django.card.models import Card


class CardFactory(DjangoModelFactory):
    class Meta:
        model = Card

    name = 'Blue-Eyes White Dragon'
    lore = 'lore'
    effect = 'effect'
    stars = 8
    attack = '3000'
    defense = '2500'
