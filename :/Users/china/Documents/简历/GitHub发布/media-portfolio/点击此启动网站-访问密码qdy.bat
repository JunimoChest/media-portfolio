@echo off
setlocal
cd /d "%~dp0"

set "SITE_URL=http://127.0.0.1:8130/"
set "PY_CMD="

if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" set "PY_CMD=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
if not defined PY_CMD if exist "%LOCALAPPDATA%\Programs\Python\Python312\python.exe" set "PY_CMD=%LOCALAPPDATA%\Programs\Python\Python312\python.exe"
if not defined PY_CMD if exist "%LOCALAPPDATA%\Programs\Python\Python311\python.exe" set "PY_CMD=%LOCALAPPDATA%\Programs\Python\Python311\python.exe"
if not defined PY_CMD if exist "%ProgramFiles%\Python312\python.exe" set "PY_CMD=%ProgramFiles%\Python312\python.exe"
if not defined PY_CMD for %%P in (python.exe) do if not defined PY_CMD set "PY_CMD=%%~$PATH:P"

if defined PY_CMD goto serve_python
goto no_runtime

:serve_python
set "PYTHONUTF8=1"
set "PYTHONIOENCODING=utf-8"
echo Starting local server. The browser will open automatically.
echo Keep this window open while browsing. Close it to stop.
"%PY_CMD%" local_server.py --port 8130
goto end

:no_runtime
echo Python not found. Opening the page directly.
start "" "index.html"
exit /b

:end
echo.
echo Server stopped. Press any key to close.
pause >nul
