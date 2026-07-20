@echo off
set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0"

if not exist "C:\Program Files\nodejs\npm.cmd" (
  echo Node.js was not found at C:\Program Files\nodejs
  echo Reinstall Node.js LTS, then try again.
  pause
  exit /b 1
)

call "C:\Program Files\nodejs\npm.cmd" run dev

if errorlevel 1 (
  echo.
  echo The app stopped because of an error.
  pause
)
