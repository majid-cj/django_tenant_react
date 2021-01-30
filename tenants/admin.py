from django.contrib import admin
from .models import Tenant, Domain

# Register your models here.
admin.site.register(Tenant)
admin.site.register(Domain)
