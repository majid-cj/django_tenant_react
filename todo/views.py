from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter

from django_filters.rest_framework import DjangoFilterBackend

from .models import TodoGroup, Todo
from .serializers import TodoGroupSerializer, TodoSerializer

# Create your views here.


class TodoGroupView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TodoGroupSerializer
    filter_backends = [SearchFilter]
    search_fields = ['name']
    queryset = TodoGroup.objects.all().order_by('id')


class TodoView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TodoSerializer
    filter_backends = [SearchFilter, DjangoFilterBackend]
    filter_fields = ['id', 'group']
    search_fields = ['title']
    queryset = Todo.objects.all().order_by('-created')
