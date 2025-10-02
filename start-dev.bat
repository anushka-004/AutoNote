@echo off
echo ========================================
echo   Starting AutoNote Development Server
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if Python is installed
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Python is not installed!
    echo Please install Python from https://www.python.org/
    pause
    exit /b 1
)

echo [1/4] Checking dependencies...
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [INFO] Installing frontend dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install frontend dependencies!
        pause
        exit /b 1
    )
)

REM Check if backend virtual environment exists
if not exist "backend\.venv\" (
    echo [INFO] Creating Python virtual environment...
    cd backend
    python -m venv .venv
    call .venv\Scripts\activate.bat
    echo [INFO] Installing backend dependencies...
    pip install -r requirements.txt
    cd ..
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install backend dependencies!
        pause
        exit /b 1
    )
) else (
    echo [INFO] Virtual environment already exists
)

echo.
echo [2/4] Starting Backend Server (Port 8000)...
echo.

REM Start backend in a new window
start "AutoNote Backend" cmd /k "cd /d %~dp0backend && .venv\Scripts\activate.bat && python start_server.py"

REM Wait a bit for backend to start
timeout /t 3 /nobreak >nul

echo.
echo [3/4] Starting Frontend Server (Port 3000)...
echo.

REM Start frontend in a new window
start "AutoNote Frontend" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo [4/4] Done!
echo.
echo ========================================
echo   AutoNote is starting...
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo.
echo Press any key to stop all servers...
pause >nul

REM Kill the servers when user presses a key
taskkill /FI "WindowTitle eq AutoNote Backend*" /T /F >nul 2>nul
taskkill /FI "WindowTitle eq AutoNote Frontend*" /T /F >nul 2>nul

echo.
echo Servers stopped.
