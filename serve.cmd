@echo off
REM Double-click this instead of index.html.
REM
REM Opening index.html directly gives you a file:// origin, and browsers block
REM ES modules from file:// (opaque origin, CORS check fails). app.js never
REM runs, so the right rail sits dead, the sidebar has no active state and the
REM scroll indicator stays invisible. The page needs any HTTP server; this is
REM the smallest one available on this machine.

cd /d "%~dp0"

where python >nul 2>nul
if errorlevel 1 (
  echo Python was not found on PATH.
  echo Use any other static server instead, e.g.  npx serve .
  pause
  exit /b 1
)

echo Serving %CD% on http://localhost:5173
echo Press Ctrl+C to stop.
start "" http://localhost:5173
python -m http.server 5173
