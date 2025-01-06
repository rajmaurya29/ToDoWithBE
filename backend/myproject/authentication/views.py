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
    permission_classes=[]
    def post(self,request,format=None):
        username=request.data['username']
        password=request.data['password']
        user=User.objects.filter(username=username).first()
        if user and user.check_password(password):
            refresh=RefreshToken.for_user(user)
            accessToken=str(refresh.access_token)
            response=Response({"message":"Login Successfull","token":accessToken,},status=status.HTTP_200_OK)
            response.set_cookie(
                key="access_token",
                value=accessToken,
                httponly=True,
                secure=True,
                samesite="None",
                path='/'
            )
            response.set_cookie(
                key="refresh_token",
                value=str(refresh),
                httponly=True,
                secure=True,
                samesite="None",
                path='/'
            )
            return response
        return Response({"message":"invalid"},status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request,format=None):
        response=Response("deleted",status=status.HTTP_200_OK)
        response.set_cookie(
                key="access_token",
                value="",
                httponly=True,
                max_age=0,
                secure=True,
                samesite="None",
                path='/'
            )
        response.set_cookie(
                key="refresh_token",
                value="",
                max_age=0,
                httponly=True,
                secure=True,
                samesite="None",
                path='/'
            )
        return response