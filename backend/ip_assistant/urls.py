# backend/ip_assistant/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('agents.urls')),  # All agent endpoints start with /api/
]
