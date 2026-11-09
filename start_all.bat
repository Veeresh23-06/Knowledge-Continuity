@echo off
title Knowledge Continuity Launcher
echo ==========================================================
echo    KNOWLEDGE CONTINUITY - Full-Stack Handover Platform
echo    Evidence-Linked Knowledge Transfer System
echo ==========================================================

set PYTHONPATH=.

REM Detect Python executable
set PYTHON_EXE=python
if exist "backend\venv\Scripts\python.exe" (
    set PYTHON_EXE=backend\venv\Scripts\python.exe
) else if exist "venv\Scripts\python.exe" (
    set PYTHON_EXE=venv\Scripts\python.exe
) else if exist ".venv\Scripts\python.exe" (
    set PYTHON_EXE=.venv\Scripts\python.exe
)

echo [1/3] Verifying database and seed data with %PYTHON_EXE%...
%PYTHON_EXE% backend\seed_data.py

echo [2/3] Starting Backend Server on http://127.0.0.1:8000...
start "KC-Backend" cmd /k "%PYTHON_EXE% -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload"

echo [3/3] Starting Frontend Server on http://localhost:3000...
cd frontend
start "KC-Frontend" cmd /k "npm run dev"
cd ..

echo ==========================================================
echo Platform running!
echo   Frontend:    http://localhost:3000
echo   Backend API: http://127.0.0.1:8000/docs
echo ==========================================================
pause
