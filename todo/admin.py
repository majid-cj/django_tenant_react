from django.contrib import admin
from .models import TodoGroup, Todo

# Register your models here.
admin.site.register(TodoGroup)
admin.site.register(Todo)
