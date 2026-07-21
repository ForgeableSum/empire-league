@echo off
set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0"

if not exist "C:\Program Files\nodejs\node.exe" (
  echo Node.js was not found at C:\Program Files\nodejs
  pause
  exit /b 1
)

"C:\Program Files\nodejs\node.exe" src\matchmaker-guest.mjs
echo.
pause
