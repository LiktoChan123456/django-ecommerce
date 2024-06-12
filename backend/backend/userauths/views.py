from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from userauths.models import User, Profile
from userauths.serializer import MyTokenObtainPairSerializer, RegisterSerializer, UserSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
import random
import shortuuid
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status

from django.core.exceptions import ObjectDoesNotExist

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

def generate_otp():
    uuid_key = shortuuid.uuid()
    unique_key = uuid_key[:12]
    return unique_key


class PasswordResetEmailVerify(generics.RetrieveAPIView):
    permission_classes= (AllowAny,)
    serializer_class = UserSerializer

    def get_object(self):
        email = self.kwargs['email']
        user = User.objects.get(email=email)
        print('user=====', user)

        if user:
            user.otp = generate_otp()
            
            uidb64=user.pk
            otp = user.otp
            user.save()


            link = f'http://localhost:5173/create-new-password?otp={otp}&uidb64={uidb64}'
            print("link=====", link)

            #send email
        return user
    

class PasswordChangeView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        payload = request.data
        otp = payload['otp']
        uidb64 = payload['uidb64']
        password = payload['password']
        
        try:
            user = User.objects.get(otp=otp, pk=uidb64)
        except ObjectDoesNotExist:
            return Response({'message': "An error occured. User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        user.set_password(password)
        user.otp = ''
        user.save()
        return Response({'message': "Password changed successfully"}, status=status.HTTP_201_CREATED)
        
