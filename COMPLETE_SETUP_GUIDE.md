# 🚀 Complete Setup Guide - Cryptoji Project

This guide contains **ALL commands** needed to set up and run the project on a new PC from scratch.

---

## 📋 Prerequisites

Before starting, make sure you have:
- **Python 3.9 or higher** installed
- **Node.js 16 or higher** installed
- **Git** (optional, for cloning)

### Check if installed:
```powershell
python --version
node --version
npm --version
```

If not installed, download from:
- Python: https://www.python.org/downloads/
- Node.js: https://nodejs.org/

**Important:** During Python installation, check "Add Python to PATH"

---

## 🔧 Step 1: Navigate to Project Directory

```powershell
cd C:\Users\91966\OneDrive\Desktop\coffin-main
```

Or if you cloned the repository:
```powershell
cd path\to\coffin-main
```

---

## 🐍 Step 2: Backend Setup (Django)

### 2.1 Create Virtual Environment

```powershell
python -m venv venv
```

### 2.2 Activate Virtual Environment

**Windows PowerShell:**
```powershell
.\venv\Scripts\Activate.ps1
```

**If you get execution policy error, run this first:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Windows Command Prompt (cmd):**
```cmd
venv\Scripts\activate.bat
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

**You should see `(venv)` at the start of your prompt when activated.**

### 2.3 Install Python Dependencies

```powershell
pip install -r requirements.txt
```

**If pip doesn't work, try:**
```powershell
python -m pip install -r requirements.txt
```

### 2.4 Run Database Migrations

```powershell
python manage.py migrate
```

### 2.5 Start Backend Server

```powershell
python manage.py runserver
```

**Backend will run on:** `http://localhost:8000`

**Keep this terminal window open!**

---

## ⚛️ Step 3: Frontend Setup (React)

### 3.1 Open a NEW Terminal Window

**Important:** Keep the backend running in the first terminal, open a new one for frontend.

### 3.2 Navigate to Frontend Directory

```powershell
cd C:\Users\91966\OneDrive\Desktop\coffin-main\cryptoji-frontend
```

### 3.3 Install Frontend Dependencies

```powershell
npm install
```

**This may take a few minutes on first run.**

### 3.4 Start Frontend Server

```powershell
npm start
```

**Frontend will run on:** `http://localhost:3000`

**The browser should open automatically!**

---

## ✅ Step 4: Verify Everything is Running

### Check Backend:
- Open browser: `http://localhost:8000`
- You should see Django welcome page or API response

### Check Frontend:
- Open browser: `http://localhost:3000`
- You should see the Coffin login/register page

### Check Ports:
```powershell
netstat -ano | findstr ":8000 :3000"
```

You should see both ports LISTENING.

---

## 🎯 Quick Start Commands (After Initial Setup)

Once everything is set up, you only need these commands:

### Terminal 1 - Backend:
```powershell
cd C:\Users\91966\OneDrive\Desktop\coffin-main
.\venv\Scripts\Activate.ps1
python manage.py runserver
```

### Terminal 2 - Frontend:
```powershell
cd C:\Users\91966\OneDrive\Desktop\coffin-main\cryptoji-frontend
npm start
```

---

## 🛠️ Troubleshooting

### Issue: "python" command not found
**Solution:**
1. Reinstall Python from python.org
2. Make sure to check "Add Python to PATH" during installation
3. Restart terminal/PowerShell

### Issue: "pip" command not found
**Solution:**
1. Make sure virtual environment is activated (you should see `(venv)`)
2. Try: `python -m pip install -r requirements.txt`

### Issue: PowerShell execution policy error
**Solution:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Issue: Virtual environment pointing to wrong path
**Solution:**
```powershell
# Delete old venv
Remove-Item -Recurse -Force venv

# Create new one
python -m venv venv

# Activate
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt
```

### Issue: "npm" command not found
**Solution:**
1. Install Node.js from nodejs.org
2. Restart terminal after installation

### Issue: Port 8000 or 3000 already in use
**Solution:**
```powershell
# Find process using port 8000
netstat -ano | findstr ":8000"

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or use different ports:
# Backend: python manage.py runserver 8001
# Frontend: PORT=3001 npm start
```

### Issue: CSRF errors
**Solution:**
- Make sure backend is running
- Restart backend server after any settings changes
- Check that `api/middleware.py` exists

### Issue: "Module not found" errors
**Solution:**
```powershell
# Backend - reinstall dependencies
pip install -r requirements.txt

# Frontend - reinstall dependencies
cd cryptoji-frontend
npm install
```

### Issue: Database errors
**Solution:**
```powershell
# Delete database and recreate
del db.sqlite3
python manage.py migrate
```

---

## 📝 Project Structure

```
coffin-main/
├── api/                    # Django API app
│   ├── views.py           # API endpoints
│   ├── models.py          # Database models
│   ├── serializers.py     # Request/response serializers
│   ├── urls.py           # API routes
│   └── middleware.py     # CSRF exemption middleware
├── cryptoji-frontend/     # React frontend
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   ├── App.css       # Styles
│   │   └── index.js      # Entry point
│   └── package.json      # Frontend dependencies
├── venv/                  # Python virtual environment
├── manage.py             # Django management script
├── requirements.txt      # Python dependencies
└── db.sqlite3            # Database (created after migrate)
```

---

## 🔑 Important Notes

1. **Always activate virtual environment** before running backend commands
2. **Keep both servers running** - backend and frontend must run simultaneously
3. **Backend runs on port 8000**, frontend on port 3000
4. **First time setup** requires running migrations
5. **After cloning**, always run `npm install` in frontend directory
6. **After pulling updates**, may need to run migrations again: `python manage.py migrate`

---

## 🚀 Production Deployment Commands

For production, use these instead:

### Backend:
```powershell
python manage.py collectstatic
python manage.py runserver 0.0.0.0:8000
```

### Frontend:
```powershell
npm run build
# Then serve the build folder with a web server
```

---

## 📞 Common Commands Reference

### Backend Commands:
```powershell
# Activate venv
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (for admin)
python manage.py createsuperuser

# Start server
python manage.py runserver

# Start on specific port
python manage.py runserver 8001
```

### Frontend Commands:
```powershell
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

---

## ✅ Checklist for New PC Setup

- [ ] Python 3.9+ installed
- [ ] Node.js 16+ installed
- [ ] Project files copied/cloned
- [ ] Virtual environment created
- [ ] Virtual environment activated
- [ ] Python dependencies installed
- [ ] Database migrations run
- [ ] Frontend dependencies installed
- [ ] Backend server running (port 8000)
- [ ] Frontend server running (port 3000)
- [ ] Can access http://localhost:3000
- [ ] Can register/login
- [ ] Can send messages

---

## 🎉 You're All Set!

Once both servers are running:
1. Open `http://localhost:3000` in your browser
2. Register a new account
3. Start sending encrypted messages!

**Remember:** Keep both terminal windows open while using the application.

---

*Last updated: 2024*
*Project: Cryptoji - Secure Emoji Messaging*

