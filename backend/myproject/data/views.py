from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class TaskList(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request,format=None):
        tasks=Task.objects.all()
        serializer= TaskSerializer(tasks,many=True)
        return Response(serializer.data)
    
class TaskDetail(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request,pk,format=None):
        tasks=Task.objects.get(id=pk)
        serializer=TaskSerializer(tasks,many=False)
        return Response(serializer.data)
    
class TaskCreate(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request,format=None):
        serializer=TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response("Entered")
    
class TaskUpdate(APIView):
    permission_classes=[IsAuthenticated]
    def put(self,request,pk,format=None):
        tasks=Task.objects.get(id=pk)
        serializer=TaskSerializer(instance=tasks,data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    
class TaskDelete(APIView):
    permission_classes=[IsAuthenticated]
    def delete(self,request,pk,format=None):
        tasks=Task.objects.get(id=pk)
        tasks.delete()
        return Response("Deleted")
    