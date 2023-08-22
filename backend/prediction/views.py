from .models import Equip, Match
from .serializers import EquipSerializer, MatchSerializer

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
        
class GetEquip(viewsets.ViewSet) :
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EquipSerializer
    queryset = Equip.objects.all()

    def list(self, request, pk=None) :
        id = pk or request.query_params.get('id')

        if id :
            self.queryset = self.queryset.filter(id=id)
        
        serializer = EquipSerializer(self.queryset, many=True)
        
        return Response(serializer.data)
    
    def create(self, request, format=None):
        serializer = EquipSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class GetMatch(viewsets.ViewSet) :
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = MatchSerializer
    queryset = Match.objects.all()

    def list(self, request, pk=None) :
        id = pk or request.query_params.get('id')

        if id :
            self.queryset = self.queryset.filter(id=id)
        
        serializer = MatchSerializer(self.queryset, many=True)
        
        return Response(serializer.data)
    
    def create(self, request, format=None):
        serializer = MatchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

