import factory

from yugioh_django.cards.models import Card
from yugioh_django.users.factories import UserFactory


class CardFactory(factory.DjangoModelFactory):
    class Meta:
        model = Card

    name = 'Blue-Eyes White Dragon'
    lore = 'lore'
    effect = 'effect'
    stars = 8
    attack = '3000'
    defense = '2500'
    author = factory.SubFactory(UserFactory)
