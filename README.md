# ⚰️ Coffin - We Bury Your Text Deep

> **Premium burial services for your digital secrets**

Transform your messages into beautiful, encrypted emoji sequences using cutting-edge hybrid encryption. Dead serious about your privacy.

![Coffin Logo](https://img.shields.io/badge/Coffin-We%20Bury%20Your%20Text%20Deep-000000?style=for-the-badge&logo=coffin&logoColor=white)
![Django](https://img.shields.io/badge/Django-4.2.24-092E20?style=for-the-badge&logo=django&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🎯 What is Coffin?

Coffin is a unique encryption service that converts regular text messages into emoji-based ciphertexts. Built with Django REST Framework, it uses a hybrid encryption approach combining RSA for key exchange and AES for efficient message encryption. The encrypted data is then encoded as a sequence of emojis, making cryptographic messages more visually appealing and fun to share.

### 🔐 Key Features

- **⚰️ Premium Burial Services** - Military-grade encryption that buries your secrets deep
- **💀 Emoji Embalming** - Transform encrypted data into beautiful emoji sequences
- **⚡ Lightning Fast Burial** - Instant encryption and decryption
- **🌐 Global Burial Services** - Works on any platform, device, or messaging app
- **🔧 Developer Friendly** - Simple REST API with comprehensive documentation
- **🎯 Zero Configuration Burial** - No setup required, just bury and go

## 🚀 Live Demo

Visit the live demo at: [Coffin Demo](https://your-demo-url.com)

## 🛠️ Tech Stack

### Backend
- **Python 3.9+** - Core programming language
- **Django 4.2.24** - Web framework
- **Django REST Framework** - API framework for building REST endpoints
- **Cryptography** - Python library for RSA and AES encryption
- **SQLite** - Database for development

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Advanced styling with CSS variables, grid, flexbox
- **Vanilla JavaScript** - No frameworks, pure performance
- **Glassmorphism** - Modern UI design effects
- **Responsive Design** - Works on all devices

## 📦 Installation & Setup

### Prerequisites

- Python 3.9 or higher
- pip (Python package installer)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/4ryanwalia/Coffin-We-Bury-Your-Text-Deep.git
cd Coffin-We-Bury-Your-Text-Deep
```

### 2. Create Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run Database Migrations

```bash
python manage.py migrate
```

### 5. Start the Backend Server

```bash
python manage.py runserver
```

The Django backend will be available at: `http://localhost:8000/`

## 🌐 API Endpoints

### Encrypt Text to Emojis

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

### Decrypt Emojis to Text

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

### Get Key Information

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

### Regenerate Keys (WARNING: This will break existing encrypted messages!)

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

### Interactive Elements
- **⚰️ Coffin-themed branding** throughout the interface
- **🌟 Floating emoji constellation** background with interactive particles
- **🌙 Dark/Light theme toggle** with smooth transitions
- **📱 Responsive design** that works on all devices
- **✨ Glassmorphism effects** for a premium feel

### User Experience
- **🔄 Live encryption demo** with real-time API integration
- **📋 Copy to clipboard** functionality with animated feedback
- **🎯 Sample text/emoji buttons** for quick testing
- **🔔 Toast notifications** for user feedback
- **⚡ Smooth animations** and micro-interactions

## 🔧 Development

### Project Structure

```
Coffin-We-Bury-Your-Text-Deep/
├── api/                    # Django API app
│   ├── views.py           # API endpoints
│   ├── crypto_utils.py    # Encryption logic
│   ├── key_manager.py     # Persistent key management
│   ├── serializers.py     # Request validation
│   └── urls.py           # API routes
├── cryptoji/              # Django project settings
├── templates/             # Frontend files
│   ├── index.html        # Main HTML file
│   ├── style.css         # CSS styles
│   └── script.js         # JavaScript functionality
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

## 🚀 Deployment

### Local Development

1. Follow the installation steps above
2. Run `python manage.py runserver`
3. Visit `http://localhost:8000/`

### Production Deployment

For production deployment, consider:

1. **Environment Variables**: Store sensitive data in environment variables
2. **Database**: Use PostgreSQL or MySQL instead of SQLite
3. **Static Files**: Configure proper static file serving
4. **HTTPS**: Ensure all communications are encrypted
5. **Key Management**: Implement secure key storage and rotation

### Docker Deployment (Optional)

```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

## 🤝 Contributing

We welcome contributions to make Coffin even better! Here's how you can help:

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
- Cryptography library for secure encryption
- All the emoji creators for making our messages beautiful
- The open-source community for inspiration and tools

## 🔮 Future Features

- **🎮 Gamification**: Coffin collection system and achievements
- **🌐 Social Features**: Share encrypted messages and challenges
- **🤖 AI Integration**: Smart suggestions and predictions
- **📱 Mobile App**: Native iOS and Android applications
- **🔗 Integrations**: Discord bot, Slack integration, browser extension
- **💰 Premium Features**: Advanced coffins and unlimited burials

---

**Remember**: We bury your text deep, so deep that even we can't find it! ⚰️✨

*Built with 💀 by a developer who takes burial seriously.*