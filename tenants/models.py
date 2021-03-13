from django_tenants.models import TenantMixin, DomainMixin

# Create your models here.


class Tenant(TenantMixin):
    auto_create_schema = True


class Domain(DomainMixin):
    pass
