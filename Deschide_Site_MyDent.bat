@echo off
title MyDent Stomatologie Oradea
chcp 65001 >nul
cls

echo ================================================================
echo   MYDENT STOMATOLOGIE ORADEA — DESCHIDERE WEBSITE
echo ================================================================
echo.
echo Se deschide site-ul MyDent Stomatologie in browserul implicit...
start index.html
echo.
echo Site-ul a fost deschis cu succes!
timeout /t 2 >nul
exit /b
