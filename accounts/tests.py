from django_tenants.utils import connection

from rest_framework.test import APITestCase
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK

from common.tests import DjangoReduxTestCases

from .models import Account

# Create your tests here.


class AccountModelTests(DjangoReduxTestCases):

    def test_create_account_for_tenants(self):
        accounts = Account.objects.all()
        self.assertEquals(accounts.count(), 1)


class AccountViewTests(APITestCase, DjangoReduxTestCases):

    def test_sign_up_api(self):
        response = self.client.post(self.signup_url, self.signup)
        self.assertEquals(response.status_code, HTTP_201_CREATED)

    def test_token_api(self):
        response = self.client.post(self.signup_url, self.signup)
        self.assertEquals(response.status_code, HTTP_201_CREATED)

        response = self.client.post(self.token_url, self.signin)
        self.assertEquals(response.status_code, HTTP_200_OK)
        self.assertEquals(response.data['username'], self.signin['username'])
