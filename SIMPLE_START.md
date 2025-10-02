# 🚀 SIMPLE START GUIDE

## ONE-CLICK START (Easiest!)

**Just double-click this file:**
```
run-both.bat
```

This will:
- ✅ Open 2 windows (Backend + Frontend)
- ✅ Start both servers automatically
- ✅ Keep them running

---

## What You'll See

### Window 1: Backend (Python)
```
🚀 Starting AutoNote API Server...
📍 URL: http://localhost:8000
INFO: Uvicorn running on http://0.0.0.0:8000
```

### Window 2: Frontend (Next.js)
```
▲ Next.js 14.2.33
- Local: http://localhost:3000
✓ Ready in 2.5s
```

---

## How to Use

1. **Double-click** `run-both.bat`
2. **Wait 10 seconds** for both to start
3. **Open browser**: http://localhost:3000
4. **Login with**:
   - Email: `test@example.com`
   - Password: `Test1234`

---

## How to Stop

**Close both terminal windows** (the ones that opened)

---

## Troubleshooting

### "Port already in use"
```powershell
# Kill backend (port 8000)
netstat -ano | findstr :8000
taskkill /PID <NUMBER> /F

# Kill frontend (port 3000)  
netstat -ano | findstr :3000
taskkill /PID <NUMBER> /F
```

### Reset Database
```powershell
cd backend
python reset_db.py
```

---

## Test Login Credentials

**Email:** test@example.com  
**Password:** Test1234

(Created by reset_db.py)
