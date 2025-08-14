#!/bin/bash

# Simplified iOS Release Build Script using React Native CLI
# This script builds a release version of the iOS app

set -e

echo "🚀 Starting Yoraa iOS Release Build..."

cd "/Users/rithikmahajan/yoraa-ios-scratch-after-point history/yoraa-ios-scratch"

echo "📁 Current directory: $(pwd)"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf ios/build
rm -rf ~/Library/Developer/Xcode/DerivedData

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Clean and install pods
echo "🔧 Installing CocoaPods..."
cd ios
bundle exec pod install --repo-update
cd ..

# Build the release version using React Native CLI
echo "🔨 Building release version..."
npx react-native run-ios --mode Release

echo "✅ iOS Release build completed successfully!"
echo "📱 The app has been built and should be running on your device/simulator"
echo "🎉 Release build process completed!"
