@echo off
setlocal
cd /d "%~dp0"
set "PATH=C:\Users\Sri Lakshman\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd;C:\Users\Sri Lakshman\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\mingw64\bin;%PATH%"
git config --local http.sslbackend openssl
git config --local credential.helper manager
echo ====================================================================
echo  Connecting and pushing to GitHub: https://github.com/srilakshman73/giftcards
echo ====================================================================
echo.
git push -u origin main
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ====================================================================
    echo [SUCCESS] Pushed all website files to https://github.com/srilakshman73/giftcards
    echo ====================================================================
) else (
    echo.
    echo [FAILED] Push did not complete. If a GitHub browser login opened, please approve it.
)
echo.
pause
