from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({"message": "Backend is running 🚀"})

urlpatterns = [
    path('', health_check, name='health_check'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api/chatbot/', include('ai_chatbot.urls')),
    path('api/', include('emergency_app.urls')),
]