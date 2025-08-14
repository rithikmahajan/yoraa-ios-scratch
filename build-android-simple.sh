#!/bin/bash

# Android Production Build Script for Yoraa App
# This script works around common React Native 0.80.x build issues

set -e

echo "🏗️  Building Android Production APK..."

# Navigate to project root
cd "/Users/rithikmahajan/yoraa-ios-scratch-after-point history/yoraa-ios-scratch"

# Step 1: Clean everything thoroughly
echo "🧹 Cleaning build artifacts..."
rm -rf android/app/build
rm -rf android/app/.cxx
rm -rf android/build
rm -rf node_modules/.cache
rm -rf /tmp/metro-*

# Step 2: Clean gradle
echo "🔄 Cleaning Gradle..."
cd android
./gradlew clean
cd ..

# Step 3: Remove problematic codegen duplicates
echo "🗑️  Removing duplicate codegen files..."
find android/app/build/generated/source/codegen -name "*RNGoogleSignin*" -delete 2>/dev/null || true
find node_modules -name "*RNGoogleSignin*" -path "*/build/generated/source/codegen/*" -delete 2>/dev/null || true

# Step 4: Create the JS bundle using React Native CLI
echo "📦 Creating optimized JavaScript bundle..."
mkdir -p android/app/src/main/assets/
npx react-native bundle \
  --platform android \
  --dev false \
  --minify true \
  --entry-file index.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
  --assets-dest android/app/src/main/res/

# Step 5: Build APK with specific configurations
echo "🔨 Building release APK..."
cd android

# Build with limited architectures and specific exclusions
./gradlew assembleRelease \
  -Preact.internal.disableDevMenuFor=release \
  -Pandroid.useAndroidX=true \
  -Pandroid.enableJetifier=true \
  -PABI_FILTERS="arm64-v8a,armeabi-v7a" \
  --parallel \
  --build-cache \
  --continue

# Step 6: Check and report results
echo "📍 Checking build output..."
APK_PATH="app/build/outputs/apk/release/app-release.apk"

if [ -f "$APK_PATH" ]; then
    echo "✅ Production APK built successfully!"
    echo "📂 APK location: android/$APK_PATH"
    
    # Get APK size
    APK_SIZE=$(du -h "$APK_PATH" | cut -f1)
    echo "📏 APK size: $APK_SIZE"
    
    # Copy to root for easy access
    cp "$APK_PATH" "../yoraa-production.apk"
    echo "📂 APK copied to: yoraa-production.apk"
    
    # Show file info
    echo "📋 APK details:"
    ls -lh "../yoraa-production.apk"
    
else
    echo "❌ APK not found at expected location"
    echo "🔍 Searching for any APK files:"
    find app/build/outputs/ -name "*.apk" 2>/dev/null || echo "No APK files found"
    exit 1
fi

cd ..
echo "🎉 Android production build completed successfully!"
echo "🚀 Your APK is ready at: yoraa-production.apk"
