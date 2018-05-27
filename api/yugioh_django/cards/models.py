import uuid

from django.contrib.postgres.fields import JSONField
from django.db import models
from model_utils.models import TimeStampedModel

from yugioh_django.users.models import User


class Card(TimeStampedModel):
    class Meta:
        db_table = 'card'

    id = models.UUIDField(db_column='id', primary_key=True, default=uuid.uuid4)
    name = models.TextField(null=False, blank=True, db_column='name')
    attribute = models.TextField(null=False, db_column='attribute')
    stars = models.IntegerField(null=True, db_column='stars')
    lore = models.TextField(null=True, blank=True, db_column='lore')
    effect = models.TextField(null=True, blank=True, db_column='effect')
    materials = JSONField(db_column='materials', null=True)
    attack = models.TextField(db_column='attack', null=True, blank=False)
    defense = models.TextField(db_column='defense', null=True, blank=False)
    pendulumLeftScale = models.IntegerField(db_column='pendulum_left_scale', null=True)
    pendulumRightScale = models.IntegerField(db_column='pendulum_right_scale', null=True)
    pendulumEffect = models.TextField(db_column='pendulum_effect', null=True, blank=False)

    author = models.ForeignKey(User, db_column='author_id', null=False, on_delete=models.CASCADE)

