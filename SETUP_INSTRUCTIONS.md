# Setup Instructions for Windows

## Step 1: Fix PowerShell Execution Policy

Open PowerShell as Administrator and run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Step 2: Verify Python Installation

Check if Python is installed:
```powershell
python --version
```

If Python is not found, install it from https://www.python.org/downloads/
Make sure to check "Add Python to PATH" during installation.

## Step 3: Navigate to Project Directory

```powershell
cd C:\Users\91966\OneDrive\Desktop\coffin-main
```

## Step 4: Create Virtual Environment

```powershell
python -m venv venv
```

## Step 5: Activate Virtual Environment

**Method 1 (Recommended):**
```powershell
.\venv\Scripts\Activate.ps1
```

If you get an execution policy error, use Method 2:

**Method 2 (Alternative):**
```powershell
venv\Scripts\activate
```

**Method 3 (If both fail):**
```powershell
& .\venv\Scripts\Activate.ps1
```

## Step 6: Verify Activation

You should see `(venv)` at the beginning of your prompt. Then verify pip:
```powershell
pip --version
```

## Step 7: Install Dependencies

```powershell
pip install -r requirements.txt
```

## Step 8: Run Database Migrations

```powershell
python manage.py migrate
```

## Step 9: Start Backend Server

```powershell
python manage.py runserver
```

---

## Frontend Setup

Open a NEW PowerShell window:

```powershell
cd C:\Users\91966\OneDrive\Desktop\coffin-main\cryptoji-frontend
npm install
npm start
```

---

## Troubleshooting

### If "python" command not found:
1. Reinstall Python from python.org
2. Check "Add Python to PATH" during installation
3. Restart PowerShell after installation

### If "pip" command not found:
1. Make sure virtual environment is activated (you should see `(venv)` in prompt)
2. Try: `python -m pip install -r requirements.txt`

### If PowerShell execution policy error:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### If activation script not found:
Make sure you're in the project root directory and the venv folder exists.

