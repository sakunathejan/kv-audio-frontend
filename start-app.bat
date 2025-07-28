@echo off
echo Starting KV Audio Full Stack Application...
echo.

echo Installing dependencies...
cd kv-audio-frontend
call npm install
cd ..

cd kv-audio-backend
call npm install
cd ..

echo.
echo Starting both applications...
echo Frontend will be available at: http://localhost:5173
echo Backend API will be available at: http://localhost:3000
echo.

cd kv-audio-frontend
start "Frontend" cmd /k "npm run dev"

cd ../kv-audio-backend
start "Backend" cmd /k "npm start"

echo Applications are starting...
echo Please wait a moment for both servers to be ready.
pause 