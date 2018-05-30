import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Meta:
        db_table = 'user'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    REQUIRED_FIELDS = ['email']
