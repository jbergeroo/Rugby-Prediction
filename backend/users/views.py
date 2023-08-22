from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from users.models import CustomUser


class GetCustomUser(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        content = {
            'username': str(request.user),  # `django.contrib.auth.User` instance.
            'auth': str(request.auth),  # None,
            'first_name' : request.user.first_name,
            'user_id' : request.user.id,
            'start_date' : request.user.start_date,
            'email' : request.user.email,
        }
        return Response(content, status=status.HTTP_200_OK)
        
    def put(self, request) :
        # id of the user
        user_id = request.user.id
        # informations that could change
        email = request.data["email"]
        username = request.data["username"]
        first_name = request.data["first_name"]
        # original infos
        email_ori = request.user.email
        username_ori = request.user.username
        first_name_ori = request.user.first_name
        # check for differences
        kwargs = {}
        user = CustomUser.objects.get(id=user_id)
        if email != email_ori :
            if CustomUser.objects.filter(email=email).count() > 0 :
                return Response({"Email" : ["This new email is already in use."]}, status=status.HTTP_400_BAD_REQUEST)
            kwargs['email'] = email
            user.email = email
        if username != username_ori :
            if CustomUser.objects.filter(username=username).count() > 0 :
                return Response({"Username" : ["This new username is already in use."]}, status=status.HTTP_400_BAD_REQUEST)
            kwargs['username'] = username
            user.username = username
        if first_name != first_name_ori :
            kwargs['first_name'] = first_name
            user.first_name = first_name

        user.save()
        
        return Response(kwargs, status=status.HTTP_200_OK)


class CustomUserCreate(APIView):
    permission_classes = [AllowAny]
    serializer_class = CustomUserSerializer

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)