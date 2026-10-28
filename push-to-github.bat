@echo off
setlocal
cd /d "%~dp0"
set "PATH=C:\Users\Sri Lakshman\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd;%PATH%"
echo Pushing "giftcard" to https://github.com/srilakshman73/giftcard.git ...
git push -u origin main
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ==========================================================
    echo [SUCCESS] Pushed all code to GitHub: https://github.com/srilakshman73/giftcard
    echo ==========================================================
) else (
    echo.
    echo [NOTE] If a browser login window opened, complete the GitHub sign-in.
    echo Or if using a Personal Access Token, you can enter it when prompted.
)
pause
