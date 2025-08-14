#!/bin/bash

# Yoraa iOS Production Build Script
# This script builds a production-ready iOS app

set -e

echo "🚀 Starting Yoraa iOS Production Build..."

# Set paths
PROJECT_ROOT="/Users/rithikmahajan/Desktop/yoraa-ios-fromscratch/yoraa-ios-scratch"
IOS_DIR="$PROJECT_ROOT/ios"
WORKSPACE_PATH="$IOS_DIR/Yoraa.xcworkspace"
SCHEME="YoraaApp"
ARCHIVE_PATH="$IOS_DIR/build/YoraaApp.xcarchive"
EXPORT_PATH="$IOS_DIR/build/Release"
EXPORT_OPTIONS_PATH="$IOS_DIR/exportOptions-production-ready.plist"

cd "$PROJECT_ROOT"

echo "📁 Current directory: $(pwd)"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf "$IOS_DIR/build"
rm -rf ~/Library/Developer/Xcode/DerivedData

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build Metro bundle
echo "📱 Building Metro bundle..."
npx react-native bundle --platform ios --dev false --entry-file index.js --bundle-output ios/main.jsbundle --assets-dest ios/

# Clean and install pods
echo "🔧 Installing CocoaPods..."
cd "$IOS_DIR"
bundle exec pod install --repo-update

cd "$PROJECT_ROOT"

echo "🔨 Building archive..."
xcodebuild -workspace "$WORKSPACE_PATH" \
           -scheme "$SCHEME" \
           -configuration Release \
           -destination generic/platform=iOS \
           -archivePath "$ARCHIVE_PATH" \
           clean archive \
           DEVELOPMENT_TEAM=D8JZ482HWR \
           CODE_SIGN_IDENTITY="iPhone Distribution" \
           PROVISIONING_PROFILE_SPECIFIER="YoraaApp_Distribution" \
           | xcpretty

if [ ! -d "$ARCHIVE_PATH" ]; then
    echo "❌ Archive failed!"
    exit 1
fi

echo "📦 Exporting IPA..."
xcodebuild -exportArchive \
           -archivePath "$ARCHIVE_PATH" \
           -exportPath "$EXPORT_PATH" \
           -exportOptionsPlist "$EXPORT_OPTIONS_PATH" \
           | xcpretty

if [ -f "$EXPORT_PATH/YoraaApp.ipa" ]; then
    echo "✅ Production build completed successfully!"
    echo "📱 IPA file location: $EXPORT_PATH/YoraaApp.ipa"
    echo "📊 File size: $(du -h "$EXPORT_PATH/YoraaApp.ipa" | cut -f1)"
    
    # Create a distribution folder
    DIST_FOLDER="$PROJECT_ROOT/dist"
    mkdir -p "$DIST_FOLDER"
    cp "$EXPORT_PATH/YoraaApp.ipa" "$DIST_FOLDER/"
    echo "📁 Copy created in: $DIST_FOLDER/YoraaApp.ipa"
else
    echo "❌ Export failed!"
    exit 1
fi

echo "🎉 Production build process completed!"
