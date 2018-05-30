from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as AuthUserAdmin

from yugioh_django.users.models import User


@admin.register(User)
class UserAdmin(AuthUserAdmin):
    pass
