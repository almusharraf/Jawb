# accounts/views.py

from django.contrib.auth import authenticate, get_user_model
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import SignupSerializer, LoginSerializer, ForgotPasswordSerializer, ResetPasswordSerializer
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from datetime import timedelta
from django.utils import timezone

User = get_user_model()

class SignupView(generics.CreateAPIView):
    serializer_class = SignupSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    serializer_class = LoginSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(username=email, password=password)
            if user:
                # Generate JWT tokens
                refresh = RefreshToken.for_user(user)
                return Response({
                    "message": "Login successful",
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                    "first_name": user.first_name,
                    "email": user.email,
                    "game_count": user.game_count  # Return game_count as part of the login response
                }, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForgotPasswordView(APIView):
    serializer_class = ForgotPasswordSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({"error": "User with this email does not exist."}, status=status.HTTP_400_BAD_REQUEST)

            # Create a short-lived access token for password reset
            reset_token = AccessToken.for_user(user)
            # Optionally, adjust the lifetime (for example, 15 minutes)
            reset_token.set_exp(lifetime=timedelta(minutes=15))
            reset_link = f"http://your-frontend-domain/reset-password?token={str(reset_token)}"
            
            # Send email (for testing, this will print to the console)
            send_mail(
                subject="Password Reset Request",
                message=f"Hi {user.first_name},\n\nPlease click the following link to reset your password: {reset_link}\n\nIf you did not request a password reset, please ignore this email.",
                from_email=settings.DEFAULT_FROM_EMAIL if hasattr(settings, "DEFAULT_FROM_EMAIL") else "noreply@example.com",
                recipient_list=[email],
                fail_silently=False,
            )
            return Response({"message": "Password reset link has been sent to your email."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordView(APIView):
    serializer_class = ResetPasswordSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            token = serializer.validated_data['token']
            try:
                access_token = AccessToken(token)
                user_id = access_token['user_id']
                user = User.objects.get(id=user_id)
            except Exception as e:
                return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)
            
            # Reset the user's password
            user.set_password(serializer.validated_data['password'])
            user.save()
            return Response({"message": "Password has been reset successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
