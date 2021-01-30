from rest_framework import serializers

from .models import TodoGroup, Todo


class TodoGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoGroup
        fields = '__all__'


class TodoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Todo
        fields = ['id', 'group', 'title', 'body', 'is_done']
