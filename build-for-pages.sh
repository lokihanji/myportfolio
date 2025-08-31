#!/bin/bash

echo "🚀 Building portfolio for GitHub Pages..."

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing Node.js dependencies..."
    npm install
fi

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf public/build

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ -d "public/build" ]; then
    echo "✅ Build successful! Files are in public/build/"
    echo "📁 Build contents:"
    ls -la public/build/
    echo ""
    echo "🚀 Ready to deploy to GitHub Pages!"
    echo "💡 Push your changes to trigger the GitHub Action"
else
    echo "❌ Build failed!"
    exit 1
fi
