@echo off
setlocal
cd /d "%~dp0"
set "PATH=C:\Users\Sri Lakshman\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback;C:\Users\Sri Lakshman\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;%PATH%"
echo Starting "A Rose Just for You" development server...
echo Open http://localhost:5173 in your browser.
call node node_modules\vite\bin\vite.js --open
pause

