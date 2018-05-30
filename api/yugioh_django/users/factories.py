import factory

from yugioh_django.users.models import User


class UserFactory(factory.DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create = ('username',)

    username = factory.Sequence(lambda n: 'User{}@industrialillusions.co.jp'.format(n))
    password = 'password'
