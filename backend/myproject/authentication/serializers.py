from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import serializers
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username','password']
    def create(self,validated_data):
        return User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )