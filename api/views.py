from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from .serializers import (
    MessageSerializer, EmojiSerializer, UserRegistrationSerializer, 
    UserSerializer, MessageCreateSerializer, MessageResponseSerializer, InboxSerializer
)
from .models import Message, UserProfile
from . import crypto_utils
from .key_manager import key_manager

# Get persistent encryption keys
_PRIV, _PUB = key_manager.get_keys()

@api_view(['POST'])
def encrypt_message(request):
    serializer = MessageSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=400)
    msg = serializer.validated_data['message'].encode('utf-8')
    try:
        enc = crypto_utils.encrypt(_PUB, msg)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    return Response({"encrypted": enc})

@api_view(['POST'])
def decrypt_message(request):
    serializer = EmojiSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=400)
    emoji_text = serializer.validated_data['emoji_text']
    try:
        dec = crypto_utils.decrypt(_PRIV, emoji_text)
        return Response({"message": dec.decode('utf-8')})
    except Exception as e:
        return Response({"error": str(e)}, status=400)

@api_view(['GET'])
def key_info(request):
    """Get information about current encryption keys"""
    info = key_manager.get_key_info()
    if info:
        return Response({
            "key_exists": True,
            "created_at": info.get('created_at'),
            "key_size": info.get('key_size'),
            "algorithm": info.get('algorithm'),
            "message": "Keys are persistent - encrypted messages will work after server restart!"
        })
    else:
        return Response({
            "key_exists": False,
            "message": "No key information available"
        })

@api_view(['POST'])
def regenerate_keys(request):
    """Regenerate encryption keys (WARNING: This will break existing encrypted messages!)"""
    try:
        global _PRIV, _PUB
        _PRIV, _PUB = key_manager.regenerate_keys()
        return Response({
            "success": True,
            "message": "New encryption keys generated successfully!",
            "warning": "All previously encrypted messages are now undecryptable!"
        })
    except Exception as e:
        return Response({"error": str(e)}, status=500)

# User Authentication Endpoints
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """Register a new user"""
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            "success": True,
            "message": "User registered successfully!",
            "user": UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    """Login user and create session"""
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({"error": "Username and password required"}, status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({
            "success": True,
            "message": "Login successful!",
            "user": UserSerializer(user).data
        })
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    """Logout user"""
    logout(request)
    return Response({"success": True, "message": "Logout successful!"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    """Get current user information"""
    return Response({
        "user": UserSerializer(request.user).data
    })

# Messaging Endpoints
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_message(request):
    """Send an encrypted message to another user"""
    serializer = MessageCreateSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    recipient_username = serializer.validated_data['recipient_username']
    message_text = serializer.validated_data['message']
    
    try:
        recipient = get_object_or_404(User, username=recipient_username)
        
        # Encrypt the message
        msg_bytes = message_text.encode('utf-8')
        encrypted_content = crypto_utils.encrypt(_PUB, msg_bytes)
        
        # Save the message
        message = Message.objects.create(
            sender=request.user,
            recipient=recipient,
            encrypted_content=encrypted_content
        )
        
        return Response({
            "success": True,
            "message": "Message sent successfully!",
            "encrypted_message": MessageResponseSerializer(message).data
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_inbox(request, username):
    """Get inbox messages for a specific user"""
    if request.user.username != username:
        return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
    
    messages = Message.objects.filter(recipient=request.user)
    serializer = InboxSerializer(messages, many=True)
    
    return Response({
        "messages": serializer.data,
        "count": messages.count()
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_conversation(request, username):
    """Get all messages in a conversation between current user and another user"""
    try:
        other_user = get_object_or_404(User, username=username)
        
        # Get messages where current user is sender and other user is recipient
        sent_messages = Message.objects.filter(sender=request.user, recipient=other_user)
        
        # Get messages where current user is recipient and other user is sender
        received_messages = Message.objects.filter(sender=other_user, recipient=request.user)
        
        # Combine and order by created_at
        all_messages = (sent_messages | received_messages).order_by('created_at')
        
        serializer = MessageResponseSerializer(all_messages, many=True)
        
        return Response({
            "messages": serializer.data,
            "count": all_messages.count()
        })
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_users(request):
    """Get list of all users (except current user)"""
    users = User.objects.exclude(id=request.user.id)
    serializer = UserSerializer(users, many=True)
    
    return Response({
        "users": serializer.data,
        "count": users.count()
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_message_read(request, message_id):
    """Mark a message as read"""
    message = get_object_or_404(Message, id=message_id, recipient=request.user)
    message.is_read = True
    message.save()
    
    return Response({"success": True, "message": "Message marked as read"})
