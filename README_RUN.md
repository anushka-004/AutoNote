# 🚀 How to Run AutoNote

## Quick Start (Recommended)

### Option 1: Using Batch File (Windows)
Simply double-click `start-dev.bat` or run:
```bash
start-dev.bat
```

### Option 2: Using PowerShell
Right-click `start-dev.ps1` → "Run with PowerShell" or run:
```powershell
.\start-dev.ps1
```

Both scripts will:
- ✅ Check if Node.js and Python are installed
- ✅ Install dependencies if needed
- ✅ Create Python virtual environment if needed
- ✅ Start backend server on port 8000
- ✅ Start frontend server on port 3000
- ✅ Open in separate windows for easy monitoring

---

## Manual Setup (Alternative)

### 1. Install Backend Dependencies

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Run Backend (Terminal 1)

```bash
cd backend
.venv\Scripts\activate
python start_server.py
```

Backend will run on: http://localhost:8000
API Docs: http://localhost:8000/docs

### 4. Run Frontend (Terminal 2)

```bash
npm run dev
```

Frontend will run on: http://localhost:3000

---

## Access Points

- **Frontend App**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## Troubleshooting

### Port Already in Use
If you get a port conflict error:

**Backend (Port 8000)**:
```bash
# Find and kill process on port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Frontend (Port 3000)**:
```bash
# Find and kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Python Virtual Environment Issues
```bash
cd backend
rmdir /s .venv
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

### Node Modules Issues
```bash
rmdir /s node_modules
npm install
```

---

## First Time Setup Checklist

- [ ] Node.js installed (v18 or higher)
- [ ] Python installed (v3.8 or higher)
- [ ] Git installed (optional)
- [ ] Run `start-dev.bat` or `start-dev.ps1`
- [ ] Open http://localhost:3000 in browser
- [ ] Test registration and login

---

## Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload
2. **Database**: SQLite database is created automatically at `backend/autonote.db`
3. **Logs**: Check the terminal windows for errors
4. **API Testing**: Use http://localhost:8000/docs for interactive API testing

---

## Stop Servers

- **Using start-dev.bat**: Press any key in the main window
- **Using start-dev.ps1**: Close the PowerShell windows
- **Manual**: Press `Ctrl+C` in each terminal
