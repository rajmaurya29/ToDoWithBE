from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import authentication, permissions
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import AccessToken
class RegisterView(APIView):
    permission_classes=[]
    def post(self,request,format=None):
        serializer=UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message":"user created sucecssfullly",
                "status":True,
                "data":serializer.data
            },status=status.HTTP_201_CREATED)
        
        return Response("error")
        
class LoginView(APIView):
    permissions_classes=[]
    def post(self,request,format=None):
        username=request.data['username']
        password=request.data['password']
        user=User.objects.filter(username=username).first()
        if user and user.check_password(password):
            refresh=RefreshToken.for_user(user)
            response=Response({"message":"Login Successfull"},status=status.HTTP_200_OK)
            response.set_cookie(
                key="access_token",
                value=str(refresh.access_token),
                httponly=True,
                secure=True,
                samesite="Lax"
            )
            response.set_cookie(
                key="refresh_token",
                value=str(refresh),
                httponly=True,
                secure=True,
                samesite="Lax"
            )
            return response
        return Response({"message":"invalid"})

class ProfileView(APIView):
    permissions_classes=[IsAuthenticated]
    def get(self,request,format=None):
        return Response("Authenticated")
