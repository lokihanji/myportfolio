@echo off
echo 🚀 Building portfolio for GitHub Pages...

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing Node.js dependencies...
    npm install
)

REM Clean previous build
echo 🧹 Cleaning previous build...
if exist "public\build" rmdir /s /q "public\build"

REM Build the project
echo 🔨 Building project...
npm run build

REM Check if build was successful
if exist "public\build" (
    echo ✅ Build successful! Files are in public\build\
    echo 📁 Build contents:
    dir "public\build"
    echo.
    echo 🚀 Ready to deploy to GitHub Pages!
    echo 💡 Push your changes to trigger the GitHub Action
) else (
    echo ❌ Build failed!
    pause
    exit /b 1
)

pause
