from django.urls import path, include

urlpatterns = [
    path(r'', include(('yugioh_django.cards.urls', 'cards'), namespace='cards'))
]