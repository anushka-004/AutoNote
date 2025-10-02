# 🧪 COMPLETE TEST GUIDE

## ✅ All Errors Fixed

1. ✅ Pydantic v2 compatibility
2. ✅ Input text visibility (added text-gray-900)
3. ✅ Error components created
4. ✅ API error handling improved
5. ✅ Database reset script created

---

## 🚀 HOW TO START (Step by Step)

### Step 1: Start Backend
Open PowerShell Window 1:
```powershell
cd c:\Users\Diya\OneDrive\AutoNote\AutoNote\backend
python start_server.py
```

**Wait for this message:**
```
INFO: Uvicorn running on http://0.0.0.0:8000
INFO: Application startup complete.
```

**✅ Backend is ready when you see "Application startup complete"**

---

### Step 2: Start Frontend
Open PowerShell Window 2:
```powershell
cd c:\Users\Diya\OneDrive\AutoNote\AutoNote
npm run dev
```

**Wait for this message:**
```
▲ Next.js 14.2.33
- Local: http://localhost:3000
✓ Ready in X.Xs
```

**✅ Frontend is ready when you see "Ready"**

---

### Step 3: Open Browser
Go to: **http://localhost:3000**

You should see:
- Blue/purple gradient background
- "AutoNote" logo
- "Get Started" button

---

## 🧪 TEST REGISTRATION

### Option A: Use Test Account (Already Created)
1. Click "Login"
2. Email: `test@example.com`
3. Password: `Test1234`
4. Click "Sign In"

### Option B: Create New Account
1. Click "Get Started" or "Register"
2. Fill in:
   - **Full Name**: Your Name
   - **Email**: your@email.com
   - **Password**: Must have:
     - ✅ At least 8 characters
     - ✅ One uppercase letter (A-Z)
     - ✅ One lowercase letter (a-z)
     - ✅ One digit (0-9)
   - **Confirm Password**: Same as password
3. Click "Create Account"

**Example valid password:** `MyPass123`

---

## ❌ Common Errors & Solutions

### Error: "Password must contain..."
**Solution:** Use password like `Test1234` or `MyPass123`

### Error: "Email already registered"
**Solution:** Either:
- Login with that email
- Use different email
- Reset database: `cd backend && python reset_db.py`

### Error: "Network error" or "Failed to fetch"
**Solution:** Backend not running. Check PowerShell Window 1.

### Error: "[object Object]"
**Solution:** Already fixed in code. Refresh browser with Ctrl+Shift+R

### Error: "Incorrect email or password"
**Solution:** 
- Make sure backend is running
- Try test account: test@example.com / Test1234
- Or reset database: `python reset_db.py`

---

## 🔧 Reset Everything

If nothing works, run these commands:

```powershell
# Stop all servers (close PowerShell windows)

# Reset database
cd c:\Users\Diya\OneDrive\AutoNote\AutoNote\backend
python reset_db.py

# Clear Next.js cache
cd c:\Users\Diya\OneDrive\AutoNote\AutoNote
Remove-Item -Recurse -Force .next

# Reinstall dependencies
npm install

# Start again from Step 1
```

---

## 📋 Checklist

Before testing, make sure:
- [ ] Backend PowerShell shows "Application startup complete"
- [ ] Frontend PowerShell shows "Ready"
- [ ] http://localhost:8000/docs opens (backend check)
- [ ] http://localhost:3000 shows AutoNote page (frontend check)
- [ ] Browser console (F12) has no red errors

---

## 🎯 Expected Behavior

### Successful Registration:
1. Form submits
2. Brief loading spinner
3. Redirects to /dashboard
4. You're logged in!

### Successful Login:
1. Form submits
2. Brief loading spinner
3. Redirects to /dashboard
4. You're logged in!

---

## 🆘 Still Not Working?

1. **Open Browser DevTools** (F12)
2. **Go to Console tab**
3. **Try to register/login**
4. **Copy the red error message**
5. **Share the error message**

Also check:
- Backend PowerShell window for Python errors
- Frontend PowerShell window for Next.js errors
