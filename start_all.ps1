Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   KNOWLEDGE CONTINUITY - Full-Stack Handover Platform    " -ForegroundColor Cyan
Write-Host "   Evidence-Linked Knowledge Transfer System              " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# Set Python Path
$env:PYTHONPATH = "."

# Detect Python Executable
$pythonExe = "python"
if (Test-Path "backend\venv\Scripts\python.exe") {
    $pythonExe = "backend\venv\Scripts\python.exe"
} elseif (Test-Path "venv\Scripts\python.exe") {
    $pythonExe = "venv\Scripts\python.exe"
} elseif (Test-Path ".venv\Scripts\python.exe") {
    $pythonExe = ".venv\Scripts\python.exe"
}

# Ensure database is seeded
Write-Host "`n[1/3] Verifying database and seed data with $pythonExe..." -ForegroundColor Yellow
& $pythonExe backend\seed_data.py

# Start Backend Server
Write-Host "`n[2/3] Starting FastAPI Backend on http://127.0.0.1:8000..." -ForegroundColor Green
$backendProc = Start-Process -FilePath $pythonExe -ArgumentList "-m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload" -PassThru

# Start Frontend Server
Write-Host "`n[3/3] Starting Next.js 15 Frontend on http://localhost:3000..." -ForegroundColor Green
Set-Location frontend
$frontendProc = Start-Process -FilePath "npm.cmd" -ArgumentList "run dev" -PassThru
Set-Location ..

Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host "Knowledge Continuity Platform is LIVE!" -ForegroundColor Green
Write-Host "  Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "  Backend API: http://127.0.0.1:8000/docs" -ForegroundColor White
Write-Host "`nDemo Accounts (Password: Password123!):" -ForegroundColor Yellow
Write-Host "  - Admin:            admin@knowledgecontinuity.io" -ForegroundColor White
Write-Host "  - Project Manager:  pm@knowledgecontinuity.io" -ForegroundColor White
Write-Host "  - Outgoing Lead:    outgoing@knowledgecontinuity.io" -ForegroundColor White
Write-Host "  - Incoming Member:  incoming@knowledgecontinuity.io" -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Press Ctrl+C or close this terminal to stop servers.`n"

try {
    Wait-Process -Id $backendProc.Id, $frontendProc.Id
} finally {
    Stop-Process -Id $backendProc.Id -ErrorAction SilentlyContinue
    Stop-Process -Id $frontendProc.Id -ErrorAction SilentlyContinue
}
