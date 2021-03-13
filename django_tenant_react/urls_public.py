from django.urls import path, include
from django.conf.urls.i18n import i18n_patterns

urlpatterns = [
    path(r'', include('frontend.urls')),
    path(r'i18n/', include('django.conf.urls.i18n')),
]


urlpatterns += i18n_patterns (
    path(r'accounts/', include('accounts.urls')),
    path(r'auth/', include('auth.urls')),
)
