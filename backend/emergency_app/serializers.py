from rest_framework import serializers
from .models import EmergencyCall

class EmergencyCallSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyCall
        fields = ['id', 'phone_number', 'call_success', 'timestamp', 'latitude', 'longitude']