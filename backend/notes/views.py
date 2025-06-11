# from django.shortcuts import render
from rest_framework import viewsets, permissions, status, generics
# from rest_framework.response import Response
from .models import Notes
from .serializers import NotesSerializer, RegisterSerializer


class NotesViewSet(viewsets.ModelViewSet):
    serializer_class = NotesSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notes.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]
