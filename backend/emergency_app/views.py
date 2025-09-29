from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .models import EmergencyCall
from .serializers import EmergencyCallSerializer

class EmergencyCallCreateView(generics.CreateAPIView):
    queryset = EmergencyCall.objects.all()
    serializer_class = EmergencyCallSerializer
    permission_classes = [AllowAny]  # Emergency calls don't require auth
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"message": "Emergency call logged successfully"}, 
            status=status.HTTP_201_CREATED
        )

class EmergencyCallListView(generics.ListAPIView):
    queryset = EmergencyCall.objects.all()
    serializer_class = EmergencyCallSerializer