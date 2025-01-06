from rest_framework.authentication import BaseAuthentication

from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import AccessToken

class CookieJWTAuthentication(BaseAuthentication):
    # print("h1")
    def authenticate(self,request):
        print("hi")
        token=request.COOKIES.get('access_token')
        print(token)
        if not token:
            return None
        try:
            validated_token=AccessToken(token)
            user_id=validated_token['user_id']
            user=User.objects.get(id=user_id)
        except Exception as e:
            raise AuthenticationFailed("Invalid token")
        return (user,None)