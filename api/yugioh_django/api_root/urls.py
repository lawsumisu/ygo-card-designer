from django.urls import path, include

urlpatterns = [
    path(r'', include(('yugioh_django.card.urls', 'card'), namespace='cards'))
]