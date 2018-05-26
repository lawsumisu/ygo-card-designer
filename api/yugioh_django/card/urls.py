from rest_framework import routers

from yugioh_django.card.views import CardViewSet

router = routers.SimpleRouter()

router.register(r'cards', CardViewSet, base_name='card')

urlpatterns = router.urls
