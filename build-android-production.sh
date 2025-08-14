#!/bin/bash

# Android Production Build Script for Yoraa App

set -e

echo "🏗️  Building Android Production APK..."

# Navigate to project root
cd "/Users/rithikmahajan/yoraa-ios-scratch-after-point history/yoraa-ios-scratch"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf android/app/build
rm -rf android/app/.cxx

# Ensure Metro is running
echo "🚇 Starting Metro bundler..."
npx react-native start --reset-cache &
METRO_PID=$!

# Wait for Metro to start
sleep 10

# Build the release APK without native builds that are causing issues
echo "📱 Building release APK..."
cd android
./gradlew assembleRelease --exclude-task configureCMakeRelWithDebInfo

# Kill Metro
kill $METRO_PID 2>/dev/null || true

# Check if APK was created
APK_PATH="app/build/outputs/apk/release/app-release.apk"
if [ -f "$APK_PATH" ]; then
    echo "✅ Production APK built successfully!"
    echo "📍 APK location: android/$APK_PATH"
    
    # Get APK size
    APK_SIZE=$(du -h "$APK_PATH" | cut -f1)
    echo "📏 APK size: $APK_SIZE"
    
    # Move to root for easy access
    cp "$APK_PATH" "../yoraa-release.apk"
    echo "📂 APK copied to: yoraa-release.apk"
else
    echo "❌ Failed to build APK"
    exit 1
fi

echo "🎉 Android production build completed!"
