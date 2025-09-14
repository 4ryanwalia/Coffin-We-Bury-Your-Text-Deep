# ⚰️ Cryptoji - Secure Emoji Messaging

> **Premium burial services for your digital secrets**

Transform your messages into beautiful, encrypted emoji sequences using cutting-edge hybrid encryption. Dead serious about your privacy.

![Coffin Logo](https://img.shields.io/badge/Coffin-We%20Bury%20Your%20Text%20Deep-000000?style=for-the-badge&logo=coffin&logoColor=white)
![Django](https://img.shields.io/badge/Django-4.2.24-092E20?style=for-the-badge&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)

## 🎯 What is Cryptoji?

Cryptoji is a unique encrypted messaging application that converts regular text messages into emoji-based ciphertexts. Built with Django REST Framework backend and React frontend, it uses a hybrid encryption approach combining RSA for key exchange and AES for efficient message encryption. The encrypted data is then encoded as a sequence of emojis, making cryptographic messages more visually appealing and fun to share.

### 🔐 Key Features

- **⚰️ Premium Burial Services** - Military-grade encryption that buries your secrets deep
- **💀 Emoji Embalming** - Transform encrypted data into beautiful emoji sequences
- **⚡ Lightning Fast Burial** - Instant encryption and decryption
- **🌐 Global Burial Services** - Works on any platform, device, or messaging app
- **🔧 Developer Friendly** - Simple REST API with comprehensive documentation
- **🎯 Zero Configuration Burial** - No setup required, just bury and go
- **👥 User Management** - Register, login, and manage user accounts
- **💬 Real-time Chat** - Send encrypted messages to other users
- **🎨 Modern UI** - Beautiful, animated interface with glassmorphism effects

## 🚀 Live Demo

The application consists of two parts:
- **Backend API**: Django REST API running on `http://localhost:8000`
- **Frontend**: React application running on `http://localhost:3000`

## 🛠️ Tech Stack

### Backend
- **Python 3.9+** - Core programming language
- **Django 4.2.24** - Web framework
- **Django REST Framework** - API framework for building REST endpoints
- **Cryptography** - Python library for RSA and AES encryption
- **SQLite** - Database for development
- **django-cors-headers** - CORS support for frontend integration

### Frontend
- **React 18.2.0** - Modern JavaScript library
- **Framer Motion** - Animation library for smooth transitions
- **Axios** - HTTP client for API communication
- **Lucide React** - Beautiful icon library
- **CSS3** - Advanced styling with glassmorphism effects
- **Responsive Design** - Works on all devices

## 📦 Installation & Setup

### Prerequisites

- Python 3.9 or higher
- Node.js 16 or higher
- npm or yarn
- Git

### Backend Setup

1. **Clone the Repository**
```bash
git clone https://github.com/4ryanwalia/Coffin-We-Bury-Your-Text-Deep.git
cd Coffin-We-Bury-Your-Text-Deep
```

2. **Create Virtual Environment**
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

3. **Install Dependencies**
```bash
pip install -r requirements.txt
```

4. **Run Database Migrations**
```bash
python manage.py migrate
```

5. **Start the Backend Server**
```bash
python manage.py runserver
```

The Django backend will be available at: `http://localhost:8000/`

### Frontend Setup

1. **Navigate to Frontend Directory**
```bash
cd ../cryptoji-frontend
```

2. **Install Dependencies**
```bash
npm install
```

3. **Start the Frontend Development Server**
```bash
npm start
```

The React frontend will be available at: `http://localhost:3000/`

## 🌐 API Endpoints

### Authentication Endpoints

#### Register User
**Endpoint:** `POST /api/register/`

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword",
  "password_confirm": "securepassword",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully!",
  "user": {
    "id": 1,
    "username": "johndoe",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "date_joined": "2024-01-01T00:00:00Z"
  }
}
```

#### Login User
**Endpoint:** `POST /api/login/`

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful!",
  "user": {
    "id": 1,
    "username": "johndoe",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "date_joined": "2024-01-01T00:00:00Z"
  }
}
```

#### Logout User
**Endpoint:** `POST /api/logout/`

**Response:**
```json
{
  "success": true,
  "message": "Logout successful!"
}
```

#### Get Current User
**Endpoint:** `GET /api/current-user/`

**Response:**
```json
{
  "user": {
    "id": 1,
    "username": "johndoe",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "date_joined": "2024-01-01T00:00:00Z"
  }
}
```

### Messaging Endpoints

#### Send Encrypted Message
**Endpoint:** `POST /api/send/`

**Request Body:**
```json
{
  "recipient_username": "janedoe",
  "message": "Hello, this is a secret message!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully!",
  "encrypted_message": {
    "id": 1,
    "sender": {
      "id": 1,
      "username": "johndoe",
      "first_name": "John",
      "last_name": "Doe"
    },
    "recipient": {
      "id": 2,
      "username": "janedoe",
      "first_name": "Jane",
      "last_name": "Doe"
    },
    "encrypted_content": "😄🎉🌟💫🚀🎈🌈✨🎊🔥🌺🦋🎭🎪🎨",
    "created_at": "2024-01-01T12:00:00Z",
    "is_read": false
  }
}
```

#### Get Inbox Messages
**Endpoint:** `GET /api/inbox/{username}/`

**Response:**
```json
{
  "messages": [
    {
      "id": 1,
      "sender": {
        "id": 1,
        "username": "johndoe",
        "first_name": "John",
        "last_name": "Doe"
      },
      "encrypted_content": "😄🎉🌟💫🚀🎈🌈✨🎊🔥🌺🦋🎭🎪🎨",
      "created_at": "2024-01-01T12:00:00Z",
      "is_read": false
    }
  ],
  "count": 1
}
```

#### Get All Users
**Endpoint:** `GET /api/users/`

**Response:**
```json
{
  "users": [
    {
      "id": 2,
      "username": "janedoe",
      "first_name": "Jane",
      "last_name": "Doe",
      "email": "jane@example.com",
      "date_joined": "2024-01-01T00:00:00Z"
    }
  ],
  "count": 1
}
```

#### Mark Message as Read
**Endpoint:** `POST /api/mark-read/{message_id}/`

**Response:**
```json
{
  "success": true,
  "message": "Message marked as read"
}
```

### Encryption Endpoints

#### Encrypt Text to Emojis
**Endpoint:** `POST /api/encrypt/`

**Request Body:**
```json
{
  "message": "Hello, World!"
}
```

**Response:**
```json
{
  "encrypted": "😄🎉🌟💫🚀🎈🌈✨🎊🔥🌺🦋🎭🎪🎨"
}
```

#### Decrypt Emojis to Text
**Endpoint:** `POST /api/decrypt/`

**Request Body:**
```json
{
  "emoji_text": "😄🎉🌟💫🚀🎈🌈✨🎊🔥🌺🦋🎭🎪🎨"
}
```

**Response:**
```json
{
  "message": "Hello, World!"
}
```

#### Get Key Information
**Endpoint:** `GET /api/key-info/`

**Response:**
```json
{
  "key_exists": true,
  "created_at": "2024-01-01T00:00:00",
  "key_size": 2048,
  "algorithm": "RSA",
  "message": "Keys are persistent - encrypted messages will work after server restart!"
}
```

#### Regenerate Keys (WARNING: This will break existing encrypted messages!)
**Endpoint:** `POST /api/regenerate-keys/`

**Response:**
```json
{
  "success": true,
  "message": "New encryption keys generated successfully!",
  "warning": "All previously encrypted messages are now undecryptable!"
}
```

## 🎨 Frontend Features

### Authentication
- **Beautiful Login/Signup Forms** with smooth animations
- **Form Validation** with real-time feedback
- **Password Visibility Toggle** for better UX
- **Responsive Design** that works on all devices

### Chat Interface
- **User List Sidebar** showing all registered users
- **Real-time Message Display** with encrypted content
- **Decrypt Button** for each message with unlock animation
- **Message Composer** with send functionality
- **Toast Notifications** for user feedback

### UI/UX Features
- **⚰️ Coffin-themed branding** throughout the interface
- **🌟 Floating emoji constellation** background with interactive particles
- **🌙 Glassmorphism effects** for a premium feel
- **📱 Responsive design** that works on all devices
- **✨ Smooth animations** and micro-interactions
- **🎯 Focus feedback** and hover effects

## 🔧 Development

### Project Structure

```
Cryptoji/
├── api/                    # Django API app
│   ├── models.py          # User and Message models
│   ├── views.py           # API endpoints
│   ├── serializers.py     # Request/response serializers
│   ├── crypto_utils.py    # Encryption logic
│   ├── key_manager.py     # Persistent key management
│   └── urls.py           # API routes
├── cryptoji/              # Django project settings
├── cryptoji-frontend/     # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API service layer
│   │   └── App.js        # Main React app
│   └── package.json      # Frontend dependencies
├── manage.py             # Django management script
├── requirements.txt      # Python dependencies
└── README.md            # This file
```

### Key Management

The application uses a persistent key management system that:
- **Generates RSA keys** on first run
- **Stores keys securely** in the `api/keys/` directory
- **Maintains encryption compatibility** across server restarts
- **Provides key information** via API endpoint
- **Allows key regeneration** (with warning about breaking existing messages)

### Security Features

- **Hybrid Encryption**: RSA + AES for security and performance
- **OAEP Padding**: Secure padding with SHA-256
- **AES-CTR Mode**: Efficient encryption for large messages
- **256 Unique Emojis**: Secure encoding with visual appeal
- **Persistent Keys**: Maintains decryption capability across restarts
- **Session Authentication**: Secure user sessions
- **CORS Protection**: Configured for frontend integration

## 🚀 Deployment

### Local Development

1. Follow the installation steps above
2. Start both servers:
   ```bash
   # Terminal 1 - Backend
   cd Cryptoji
   venv\Scripts\activate
   python manage.py runserver
   
   # Terminal 2 - Frontend
   cd cryptoji-frontend
   npm start
   ```
3. Visit `http://localhost:3000/`

### Production Deployment

For production deployment, consider:

1. **Environment Variables**: Store sensitive data in environment variables
2. **Database**: Use PostgreSQL or MySQL instead of SQLite
3. **Static Files**: Configure proper static file serving
4. **HTTPS**: Ensure all communications are encrypted
5. **Key Management**: Implement secure key storage and rotation
6. **Frontend Build**: Use `npm run build` for production React build

## 📝 Sample cURL Commands

### Register a new user
```bash
curl -X POST http://localhost:8000/api/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpassword123",
    "password_confirm": "testpassword123",
    "first_name": "Test",
    "last_name": "User"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpassword123"
  }' \
  -c cookies.txt
```

### Send a message (requires authentication)
```bash
curl -X POST http://localhost:8000/api/send/ \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "recipient_username": "anotheruser",
    "message": "Hello, this is a secret message!"
  }'
```

### Get inbox messages
```bash
curl -X GET http://localhost:8000/api/inbox/testuser/ \
  -b cookies.txt
```

### Decrypt a message
```bash
curl -X POST http://localhost:8000/api/decrypt/ \
  -H "Content-Type: application/json" \
  -d '{
    "emoji_text": "😄🎉🌟💫🚀🎈🌈✨🎊🔥🌺🦋🎭🎪🎨"
  }'
```

## 🤝 Contributing

We welcome contributions to make Cryptoji even better! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow PEP 8 for Python code
- Use meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design for frontend changes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ryan Walia**
- GitHub: [@4ryanwalia](https://github.com/4ryanwalia)
- Project: [Coffin - We Bury Your Text Deep](https://github.com/4ryanwalia/Coffin-We-Bury-Your-Text-Deep)

## 🙏 Acknowledgments

- Django team for the amazing web framework
- React team for the powerful frontend library
- Cryptography library for secure encryption
- Framer Motion for beautiful animations
- All the emoji creators for making our messages beautiful
- The open-source community for inspiration and tools

## 🔮 Future Features

- **🎮 Gamification**: Coffin collection system and achievements
- **🌐 Social Features**: Share encrypted messages and challenges
- **🤖 AI Integration**: Smart suggestions and predictions
- **📱 Mobile App**: Native iOS and Android applications
- **🔗 Integrations**: Discord bot, Slack integration, browser extension
- **💰 Premium Features**: Advanced coffins and unlimited burials
- **🔄 Real-time Updates**: WebSocket integration for live messaging
- **📁 File Sharing**: Encrypted file transfer capabilities

---

**Remember**: We bury your text deep, so deep that even we can't find it! ⚰️✨

*Built with 💀 by a developer who takes burial seriously.*#   C o f f i n  
 