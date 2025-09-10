from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MessageSerializer, EmojiSerializer
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
