Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting AutoNote Development Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if Python is installed
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Python is not installed!" -ForegroundColor Red
    Write-Host "Please install Python from https://www.python.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[1/4] Checking dependencies..." -ForegroundColor Yellow
Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "[INFO] Installing frontend dependencies..." -ForegroundColor Cyan
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to install frontend dependencies!" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

# Check if backend virtual environment exists
if (-not (Test-Path "backend\.venv")) {
    Write-Host "[INFO] Creating Python virtual environment..." -ForegroundColor Cyan
    Set-Location backend
    python -m venv .venv
    & .\.venv\Scripts\Activate.ps1
    Write-Host "[INFO] Installing backend dependencies..." -ForegroundColor Cyan
    pip install -r requirements.txt
    Set-Location ..
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to install backend dependencies!" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
} else {
    Write-Host "[INFO] Virtual environment already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "[2/4] Starting Backend Server (Port 8000)..." -ForegroundColor Yellow
Write-Host ""

# Start backend in a new window
$backendPath = Join-Path $PSScriptRoot "backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; .\.venv\Scripts\Activate.ps1; python start_server.py" -WindowStyle Normal

# Wait for backend to start
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "[3/4] Starting Frontend Server (Port 3000)..." -ForegroundColor Yellow
Write-Host ""

# Start frontend in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "[4/4] Done!" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   AutoNote is running!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Frontend: " -NoNewline
Write-Host "http://localhost:3000" -ForegroundColor Green
Write-Host "Backend:  " -NoNewline
Write-Host "http://localhost:8000" -ForegroundColor Green
Write-Host "API Docs: " -NoNewline
Write-Host "http://localhost:8000/docs" -ForegroundColor Green
Write-Host ""
Write-Host "Close the PowerShell windows to stop the servers." -ForegroundColor Yellow
Write-Host ""
