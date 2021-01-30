from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import TodoGroupView, TodoView


router = DefaultRouter()
router.register(r'group', TodoGroupView, basename='todo-group')
router.register(r'todo', TodoView, basename='todo')

app_name = 'todo'

urlpatterns = [
    path('', include(router.urls)),
]
