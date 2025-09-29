from django.contrib import admin
from .models import EmergencyCall

@admin.register(EmergencyCall)
class EmergencyCallAdmin(admin.ModelAdmin):
    list_display = ['phone_number', 'call_success', 'timestamp', 'latitude', 'longitude']
    list_filter = ['call_success', 'timestamp']
    readonly_fields = ['timestamp']