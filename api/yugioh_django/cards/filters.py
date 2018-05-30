from rest_framework.filters import BaseFilterBackend


class ViewableCardFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        return queryset.filter(author=request.user)
