from rest_framework import routers

from yugioh_django.cards.views import CardViewSet

router = routers.SimpleRouter()

router.register(r'cards', CardViewSet, base_name='cards')

urlpatterns = router.urls
