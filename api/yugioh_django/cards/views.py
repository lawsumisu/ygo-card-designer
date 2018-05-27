from rest_framework import mixins, viewsets

from yugioh_django.cards.models import Card
from yugioh_django.cards.serializers import CardSerializer


class CardViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):
    serializer_class = CardSerializer
    queryset = Card.objects.all()
