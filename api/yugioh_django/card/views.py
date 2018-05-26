from rest_framework import mixins, viewsets

from yugioh_django.card.models import Card
from yugioh_django.card.serializers import CardSerializer


class CardViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = CardSerializer
    queryset = Card.objects.all()