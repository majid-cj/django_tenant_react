from uuid import uuid4

from django.utils import timezone
from django.db import models

from auditlog.registry import auditlog
from auditlog.models import AuditlogHistoryField

# Create your models here.


class TodoGroup(models.Model):
    name = models.CharField(max_length=250)
    history = AuditlogHistoryField()

    def __str__(self):
        return self.name


class Todo(models.Model):
    group = models.ForeignKey('todo.TodoGroup', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    body = models.TextField(null=True, blank=True)
    is_done = models.BooleanField(default=False)
    created = models.DateTimeField(default=timezone.now)
    modified = models.DateTimeField(default=timezone.now)
    history = AuditlogHistoryField()

    def __str__(self):
        return f'{self.title} for group {self.group}'

    def save(self, *args, **kwargs):
        self.modified = timezone.now()
        super().save(*args, **kwargs)


auditlog.register(TodoGroup)
auditlog.register(Todo)
