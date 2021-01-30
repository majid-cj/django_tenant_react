import json

from django.conf import settings
from django.urls import reverse

from django_tenants.utils import connection
from django_tenants.test.client import TenantClient

from rest_framework.test import APITestCase, APIClient
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK

from unittest.mock import patch


from auth.utils import DjangoReduxJWTAuthentication

from common.tests import DjangoReduxTestCases

from .models import TodoGroup, Todo
from tenants.models import Tenant, Domain


# Create your tests here.


class TodoGroupTestModel(DjangoReduxTestCases):
    def setUp(self):
        connection.set_schema_to_public()
        self.tenant_2 = Tenant.objects.create(schema_name='tenant2')
        connection.set_tenant(self.tenant_2)
        self.group = TodoGroup.objects.create(name='todo group')

    def test_create_todo_group(self):
        connection.set_tenant(self.tenant_2)
        TodoGroup.objects.create(name='todo group')

        count = TodoGroup.objects.all().count()
        self.assertEquals(count, 2)

        connection.set_tenant(self.tenant)
        count = TodoGroup.objects.all().count()
        self.assertEquals(count, 0)
        connection.set_schema_to_public()


class TodoTestModel(DjangoReduxTestCases):
    def setUp(self):
        connection.set_schema_to_public()

        connection.set_tenant(self.tenant)
        self.group_1 = TodoGroup.objects.create(name='todo group')

        connection.set_schema_to_public()
        self.tenant_2 = Tenant.objects.create(schema_name='tenant2')
        connection.set_tenant(self.tenant_2)
        self.group_2 = TodoGroup.objects.create(name='todo group 2')
        connection.set_schema_to_public()

    def test_create_todo(self):
        connection.set_tenant(self.tenant)
        Todo.objects.create(group=self.group_1,
                            title='todo 1', body='todo things first')
        Todo.objects.create(group=self.group_1,
                            title='todo 2', body='todo things second')

        connection.set_tenant(self.tenant_2)
        Todo.objects.create(group=self.group_1,
                            title='todo 1', body='todo things first')

        connection.set_tenant(self.tenant)
        count = Todo.objects.all().count()
        self.assertEquals(count, 2)

        connection.set_tenant(self.tenant_2)
        count = Todo.objects.all().count()
        self.assertEquals(count, 1)


class TodoGroupTestAPI(APITestCase, DjangoReduxTestCases):
    def setUp(self):
        self.data = {
            'name': 'todo group',
        }
        self.client = TenantClient(self.tenant)

    @patch.object(DjangoReduxJWTAuthentication, 'authenticate')
    def test_create_todo_group_api(self, mock):
        mock.return_value = self.account, {}
        response = self.client.post(reverse('todo:todo-group-list'), self.data)
        self.assertEquals(response.status_code, HTTP_201_CREATED)

    @patch.object(DjangoReduxJWTAuthentication, 'authenticate')
    def test_get_todo_group_by_id_api(self, mock):
        mock.return_value = self.account, {}
        response = self.client.post(reverse('todo:todo-group-list'), self.data)
        self.assertEquals(response.status_code, HTTP_201_CREATED)

        id = response.data['id']
        response = self.client.get(
            reverse('todo:todo-group-detail', kwargs={'pk': id}))
        self.assertEquals(response.status_code, HTTP_200_OK)
        self.assertEquals(response.data['name'], self.data['name'])

    @patch.object(DjangoReduxJWTAuthentication, 'authenticate')
    def test_update_todo_group_api(self, mock):
        mock.return_value = self.account, {}
        response = self.client.post(reverse('todo:todo-group-list'), self.data)
        self.assertEquals(response.status_code, HTTP_201_CREATED)

        id = response.data['id']
        self.data['name'] = 'update todo group'
        response = self.client.put(
            path=reverse('todo:todo-group-detail', kwargs={'pk': id}),
            data=json.dumps(self.data),
            content_type='application/json')
        self.assertEquals(response.status_code, HTTP_200_OK)
        self.assertEquals(response.data['name'], 'update todo group')


class TodoTestAPI(APITestCase, DjangoReduxTestCases):
    def setUp(self):
        self.group = {
            'name': 'todo group',
        }
        self.data = {
            'group': None,
            'title': 'todo title',
            'body': 'todo object body',
            'is_done': False,
        }
        self.client = TenantClient(self.tenant)

    @patch.object(DjangoReduxJWTAuthentication, 'authenticate')
    def test_create_todo_api(self, mock):
        mock.return_value = self.account, {}
        response = self.client.post(
            reverse('todo:todo-group-list'), self.group)
        self.assertEquals(response.status_code, HTTP_201_CREATED)

        self.data['group'] = response.data['id']
        response = self.client.post(reverse('todo:todo-list'), self.data)
        self.assertEquals(response.status_code, HTTP_201_CREATED)

    @patch.object(DjangoReduxJWTAuthentication, 'authenticate')
    def test_update_todo_api(self, mock):
        mock.return_value = self.account, {}
        response = self.client.post(
            reverse('todo:todo-group-list'), self.group)
        self.assertEquals(response.status_code, HTTP_201_CREATED)

        self.data['group'] = response.data['id']
        response = self.client.post(reverse('todo:todo-list'), self.data)
        self.assertEquals(response.status_code, HTTP_201_CREATED)

        id = response.data['id']

        self.data['body'] = 'this is updated todo body'
        response = self.client.put(
            path=reverse('todo:todo-detail', kwargs={'pk': id}),
            data=json.dumps(self.data),
            content_type='application/json',
        )
        self.assertEquals(response.status_code, HTTP_200_OK)
        self.assertEquals(response.data['body'], 'this is updated todo body')
        self.assertFalse(response.data['is_done'])

        self.data['is_done'] = True
        response = self.client.put(
            path=reverse('todo:todo-detail', kwargs={'pk': id}),
            data=json.dumps(self.data),
            content_type='application/json',
        )
        self.assertEquals(response.status_code, HTTP_200_OK)
        self.assertTrue(response.data['is_done'])
