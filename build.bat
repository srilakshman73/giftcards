@echo off
setlocal
cd /d "%~dp0"
set "PATH=C:\Users\Sri Lakshman\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback;C:\Users\Sri Lakshman\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;%PATH%"
echo Building "A Rose Just for You" production bundle...
call node node_modules\typescript\bin\tsc --noEmit
call node node_modules\vite\bin\vite.js build
echo Build completed successfully in dist/
pause

