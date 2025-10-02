@echo off
color 0A
echo.
echo ========================================
echo    AutoNote - Complete Startup Guide
echo ========================================
echo.
echo This will open 2 PowerShell windows:
echo   1. Backend (Python/FastAPI)
echo   2. Frontend (Next.js/React)
echo.
echo KEEP BOTH WINDOWS OPEN while using the app!
echo.
pause

echo.
echo [1/2] Starting Backend Server...
start "AutoNote Backend" powershell -NoExit -Command "cd '%~dp0backend'; Write-Host '=== BACKEND SERVER ===' -ForegroundColor Cyan; Write-Host 'Starting Python server...' -ForegroundColor Yellow; python start_server.py"

echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak >nul

echo.
echo [2/2] Starting Frontend Server...
start "AutoNote Frontend" powershell -NoExit -Command "cd '%~dp0'; Write-Host '=== FRONTEND SERVER ===' -ForegroundColor Cyan; Write-Host 'Starting Next.js...' -ForegroundColor Yellow; npm run dev"

echo.
echo ========================================
echo   Servers are starting!
echo ========================================
echo.
echo Wait 15 seconds, then open your browser:
echo.
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:8000/docs
echo.
echo Test Login:
echo   Email: test@example.com
echo   Password: Test1234
echo.
echo ========================================
echo.
echo Two PowerShell windows opened.
echo KEEP THEM OPEN while using AutoNote!
echo.
echo Close this window when done.
pause
