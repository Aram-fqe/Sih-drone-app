from django.urls import path
from .views import EmergencyCallCreateView, EmergencyCallListView

urlpatterns = [
    path('emergency-calls/', EmergencyCallCreateView.as_view(), name='emergency-call-create'),
    path('call-history/', EmergencyCallListView.as_view(), name='call-history'),
]