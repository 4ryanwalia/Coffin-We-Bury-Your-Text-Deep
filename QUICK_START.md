# ⚡ Quick Start - All Commands

Copy and paste these commands in order.

---

## 🆕 First Time Setup

### Backend Setup:
```powershell
# 1. Navigate to project
cd C:\Users\91966\OneDrive\Desktop\coffin-main

# 2. Create virtual environment
python -m venv venv

# 3. Activate virtual environment
.\venv\Scripts\Activate.ps1

# 4. Install dependencies
pip install -r requirements.txt

# 5. Run migrations
python manage.py migrate

# 6. Start backend
python manage.py runserver
```

### Frontend Setup (New Terminal):
```powershell
# 1. Navigate to frontend
cd C:\Users\91966\OneDrive\Desktop\coffin-main\cryptoji-frontend

# 2. Install dependencies
npm install

# 3. Start frontend
npm start
```

---

## 🔄 Daily Use (After Setup)

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

## 🛠️ Troubleshooting Commands

### Fix PowerShell Execution Policy:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Recreate Virtual Environment:
```powershell
Remove-Item -Recurse -Force venv
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### Check if Servers are Running:
```powershell
netstat -ano | findstr ":8000 :3000"
```

### Reinstall Frontend Dependencies:
```powershell
cd cryptoji-frontend
Remove-Item -Recurse -Force node_modules
npm install
```

---

## 📍 URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Endpoints:** http://localhost:8000/api/

---

**That's it!** Keep both terminals open while using the app.

