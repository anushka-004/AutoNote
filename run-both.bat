@echo off
echo ========================================
echo   Starting AutoNote (Backend + Frontend)
echo ========================================
echo.

REM Start backend in new window
echo [1/2] Starting Backend Server...
start "AutoNote Backend - Port 8000" cmd /k "cd /d %~dp0backend && python start_server.py"

REM Wait 3 seconds for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in new window  
echo [2/2] Starting Frontend Server...
start "AutoNote Frontend - Port 3000" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo ========================================
echo   Both servers are starting!
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Two windows opened - keep them running!
echo Close this window when done.
echo.
pause
