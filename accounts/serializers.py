from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _

from .models import Account


class AccountSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(required=True)

    class Meta:
        model = Account
        fields = ['name', 'username', 'password', 'confirm_password']
        extra_kwargs = {
            'password': {'write_only': True},
            'confirm_password': {'write_only': True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError(_("passwords don't match"))
        return super().validate(attrs)

    def create(self, validated_data):
        is_superuser = validated_data.get('is_superuser', None)
        if is_superuser:
            return Account.objects.create_superuser(
                name=validated_data['name'],
                username=validated_data['username'],
                password=validated_data['password'],
            )

        return Account.objects.create_superuser(
            name=validated_data['name'],
            username=validated_data['username'],
            password=validated_data['password'],
        )
