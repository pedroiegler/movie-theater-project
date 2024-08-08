from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Configuração do Swagger
schema_view = get_schema_view(
    openapi.Info(
        title="Movie Theater API",
        default_version='v1',
        description="API documentation for the Movie Theater project",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@movietheater.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('movie_theater.api.urls')),
    path('movie_theater/', include('movie_theater.dash.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
