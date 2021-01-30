from django.conf import settings
from django.test import TestCase
from django_tenants.utils import connection

from accounts.models import Account
from tenants.models import Tenant, Domain


class DjangoReduxTestCases(TestCase):
    signup_url = f'http://{settings.APPLICATION_DOMAIN}:8000/auth/signup/'
    token_url = f'http://{settings.APPLICATION_DOMAIN}:8000/auth/token/'

    signup = {
        'name': 'test user',
        'username': 'test',
        'password': 'm1122335544',
        'confirm_password': 'm1122335544',
    }
    signin = {
        'username': 'test',
        'password': 'm1122335544',
    }

    def setUp(self):
        connection.set_schema_to_public()
        self.tenant.refresh_from_db()
        connection.set_tenant(self.tenant)
        self.account.refresh_from_db()

    @classmethod
    def setUpTestData(cls):
        connection.set_schema_to_public()
        cls.tenant = Tenant.objects.create(schema_name='tenant1')
        cls.tenant_domain = Domain()
        cls.tenant_domain.tenant = cls.tenant
        cls.tenant_domain.domain = 'tenant1.djangoredux.com'
        cls.tenant_domain.save()

        connection.set_tenant(cls.tenant)
        cls.account = Account.objects.create_superuser(
            'tenant user', 'user', 'Tu112231')

        connection.set_schema_to_public()

    def get_url(self, tenant, view):
        return f'http://{tenant}.{settings.APPLICATION_DOMAIN}:8000{view}'
