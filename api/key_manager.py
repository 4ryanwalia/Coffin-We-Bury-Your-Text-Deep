"""
Key Management System for Cryptoji
Handles persistent storage and retrieval of encryption keys
"""

import os
import json
import base64
from pathlib import Path
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from . import crypto_utils

class KeyManager:
    def __init__(self):
        self.keys_dir = Path(__file__).parent / 'keys'
        self.keys_dir.mkdir(exist_ok=True)
        self.private_key_file = self.keys_dir / 'private_key.pem'
        self.public_key_file = self.keys_dir / 'public_key.pem'
        self.key_info_file = self.keys_dir / 'key_info.json'
        
    def _key_exists(self):
        """Check if keys already exist"""
        return self.private_key_file.exists() and self.public_key_file.exists()
    
    def _save_keys(self, private_key, public_key):
        """Save keys to files"""
        # Save private key
        with open(self.private_key_file, 'wb') as f:
            f.write(private_key.private_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PrivateFormat.PKCS8,
                encryption_algorithm=serialization.NoEncryption()
            ))
        
        # Save public key
        with open(self.public_key_file, 'wb') as f:
            f.write(public_key.public_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PublicFormat.SubjectPublicKeyInfo
            ))
        
        # Save key metadata
        key_info = {
            'created_at': str(crypto_utils.datetime.now()),
            'key_size': 2048,
            'algorithm': 'RSA'
        }
        with open(self.key_info_file, 'w') as f:
            json.dump(key_info, f, indent=2)
    
    def _load_keys(self):
        """Load keys from files"""
        try:
            # Load private key
            with open(self.private_key_file, 'rb') as f:
                private_key = serialization.load_pem_private_key(
                    f.read(), password=None
                )
            
            # Load public key
            with open(self.public_key_file, 'rb') as f:
                public_key = serialization.load_pem_public_key(f.read())
            
            return private_key, public_key
        except Exception as e:
            print(f"Error loading keys: {e}")
            return None, None
    
    def get_keys(self):
        """Get encryption keys, creating new ones if needed"""
        if self._key_exists():
            print("Loading existing encryption keys...")
            private_key, public_key = self._load_keys()
            if private_key and public_key:
                return private_key, public_key
        
        print("Generating new encryption keys...")
        private_key, public_key = crypto_utils.generate_keys()
        self._save_keys(private_key, public_key)
        print("Keys saved successfully!")
        return private_key, public_key
    
    def regenerate_keys(self):
        """Force regeneration of new keys (WARNING: This will break existing encrypted messages!)"""
        print("WARNING: Regenerating keys will make all existing encrypted messages undecryptable!")
        
        # Remove existing keys
        if self.private_key_file.exists():
            self.private_key_file.unlink()
        if self.public_key_file.exists():
            self.public_key_file.unlink()
        if self.key_info_file.exists():
            self.key_info_file.unlink()
        
        # Generate new keys
        private_key, public_key = crypto_utils.generate_keys()
        self._save_keys(private_key, public_key)
        print("New keys generated and saved!")
        return private_key, public_key
    
    def get_key_info(self):
        """Get information about current keys"""
        if not self.key_info_file.exists():
            return None
        
        try:
            with open(self.key_info_file, 'r') as f:
                return json.load(f)
        except Exception as e:
            print(f"Error reading key info: {e}")
            return None

# Global key manager instance
key_manager = KeyManager()
