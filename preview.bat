@echo off
setlocal
cd /d "%~dp0"
set "PATH=C:\Users\Sri Lakshman\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback;C:\Users\Sri Lakshman\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;%PATH%"
echo Starting preview of production build...
call node node_modules\vite\bin\vite.js preview --port 4173 --open
pause

