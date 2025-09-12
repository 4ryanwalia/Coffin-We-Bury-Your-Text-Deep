from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Message, UserProfile

class MessageSerializer(serializers.Serializer):
    message = serializers.CharField()

class EmojiSerializer(serializers.Serializer):
    emoji_text = serializers.CharField()

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'password', 'password_confirm')
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Passwords don't match")
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        # Add a default email if not provided
        if 'email' not in validated_data:
            validated_data['email'] = f"{validated_data['username']}@cryptoji.local"
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user)
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'date_joined')
        read_only_fields = ('id', 'date_joined')

class MessageCreateSerializer(serializers.Serializer):
    recipient_username = serializers.CharField()
    message = serializers.CharField()

class MessageResponseSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    recipient = UserSerializer(read_only=True)
    
    class Meta:
        model = Message
        fields = ('id', 'sender', 'recipient', 'encrypted_content', 'created_at', 'is_read')

class InboxSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    
    class Meta:
        model = Message
        fields = ('id', 'sender', 'encrypted_content', 'created_at', 'is_read')
