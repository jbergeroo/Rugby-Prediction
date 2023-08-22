from django.contrib import admin
from django.urls import path, include, re_path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    # authentification
    re_path('auth/', include('drf_social_oauth2.urls', namespace='drf')),
    # admin page
    path('admin/', admin.site.urls),
    # creation of user
    path('api/user/', include('users.urls', namespace='users')),
    # login in django
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # Spectacular view
    path('api/doc/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/doc/schema/ui/', SpectacularSwaggerView.as_view())
]