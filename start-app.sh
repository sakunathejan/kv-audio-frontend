#!/bin/bash

echo "Starting KV Audio Full Stack Application..."
echo

echo "Installing dependencies..."
cd kv-audio-frontend
npm install
cd ..

cd kv-audio-backend
npm install
cd ..

echo
echo "Starting both applications..."
echo "Frontend will be available at: http://localhost:5173"
echo "Backend API will be available at: http://localhost:3000"
echo

# Start backend in background
cd kv-audio-backend
npm start &
BACKEND_PID=$!

# Start frontend in background
cd ../kv-audio-frontend
npm run dev &
FRONTEND_PID=$!

echo "Applications are starting..."
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo
echo "Press Ctrl+C to stop both applications"

# Wait for user to stop
trap "echo 'Stopping applications...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait 