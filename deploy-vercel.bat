@echo off
setlocal
cd /d "%~dp0"
set "PATH=C:\Users\Sri Lakshman\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback;C:\Users\Sri Lakshman\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;%PATH%"
echo ===================================================
echo   Deploying "giftcard" to Vercel Production
echo ===================================================
echo.
echo Step 1: Logging in to Vercel...
call pnpm dlx vercel login
echo.
echo Step 2: Linking project to Vercel...
call pnpm dlx vercel link --yes
echo.
echo Step 3: Deploying to Production...
call pnpm dlx vercel --prod
echo.
echo ===================================================
echo   Deployment completed!
echo ===================================================
pause

