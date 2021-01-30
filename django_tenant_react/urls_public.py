from django.urls import path, include


urlpatterns = [
    path(r'', include('frontend.urls')),
    path(r'accounts/', include('accounts.urls')),
    path(r'auth/', include('auth.urls')),
]
