# backend/agents/urls.py

from django.urls import path
from .views import run_patent_pipeline, download_pdf

urlpatterns = [
    path('run-agent/', run_patent_pipeline, name='run_patent_pipeline'),
    path('download-pdf/', download_pdf, name='download_pdf'),
]



