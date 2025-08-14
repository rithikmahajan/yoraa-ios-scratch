# 🚀 YORAA App Store Deployment Guide

## ⚠️ Prerequisites Required

Before deploying to the App Store, you need:

### 1. **Apple Developer Account**
- **Individual Account**: $99/year
- **Organization Account**: $99/year  
- Sign up at: https://developer.apple.com/programs/

### 2. **App Store Connect Access**
- Create your app listing at: https://appstoreconnect.apple.com
- Set up app metadata, screenshots, descriptions

### 3. **Code Signing Setup**
- Development Team ID from your Apple Developer account
- Distribution certificate and provisioning profile

---

## 🔧 Step 1: Configure Xcode Project

### A. Set Development Team
1. Open `YoraaApp.xcworkspace` in Xcode
2. Select the **YoraaApp** project in the navigator
3. Go to **Signing & Capabilities** tab
4. Select your **Team** from the dropdown
5. Ensure **Automatically manage signing** is checked

### B. Update Bundle Identifier
Update to a unique identifier:
```
com.yourcompany.yoraa
```

### C. Set Version Information
- **Version**: 1.0.0 (Marketing Version)
- **Build**: 1 (Current Project Version)

---

## 📱 Step 2: Prepare App Metadata

### Required Information:
- **App Name**: YORAA
- **Subtitle**: Fashion Forward
- **Description**: Professional fashion app with AR try-on features
- **Keywords**: fashion, clothing, style, shopping, AR, try-on
- **Category**: Shopping or Lifestyle
- **Age Rating**: 4+ (or appropriate rating)

### Required Assets:
- **App Icon**: 1024x1024px PNG
- **Screenshots**: 
  - iPhone 6.7" (1290x2796px) - 3 minimum
  - iPhone 6.5" (1242x2688px) - 3 minimum
  - iPhone 5.5" (1242x2208px) - 3 minimum
- **Preview Video** (optional but recommended)

---

## 🛠️ Step 3: Build for Release

### A. Clean and Build
```bash
# Navigate to iOS directory
cd ios

# Clean previous builds
xcodebuild clean -workspace YoraaApp.xcworkspace -scheme YoraaApp

# Build for release
xcodebuild -workspace YoraaApp.xcworkspace \
           -scheme YoraaApp \
           -configuration Release \
           -destination generic/platform=iOS \
           archive -archivePath YoraaApp.xcarchive
```

### B. Create IPA for Distribution
```bash
# Export for App Store
xcodebuild -exportArchive \
           -archivePath YoraaApp.xcarchive \
           -exportPath ./Release \
           -exportOptionsPlist exportOptions.plist
```

---

## 📋 Step 4: Create Export Options

Create `exportOptions.plist`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>app-store</string>
    <key>uploadBitcode</key>
    <false/>
    <key>uploadSymbols</key>
    <true/>
    <key>compileBitcode</key>
    <false/>
</dict>
</plist>
```

---

## 🚀 Step 5: Upload to App Store

### Option A: Xcode Organizer
1. Open **Window > Organizer** in Xcode
2. Select your archive
3. Click **Distribute App**
4. Choose **App Store Connect**
5. Follow the upload wizard

### Option B: Transporter App
1. Download **Transporter** from Mac App Store
2. Drag your `.ipa` file to Transporter
3. Sign in with your Apple ID
4. Upload to App Store Connect

### Option C: Command Line
```bash
# Using xcrun altool (legacy)
xcrun altool --upload-app \
             --type ios \
             --file YoraaApp.ipa \
             --username your-apple-id@email.com \
             --password your-app-specific-password

# Using xcrun notarytool (recommended)
xcrun notarytool submit YoraaApp.ipa \
                --apple-id your-apple-id@email.com \
                --password your-app-specific-password \
                --team-id YOUR-TEAM-ID
```

---

## 📝 Step 6: App Store Connect Configuration

### 1. **App Information**
- Set app name, bundle ID, SKU
- Configure app categories
- Set content rights and age rating

### 2. **Version Information**
- Upload app screenshots
- Write app description and what's new
- Set keywords and support/marketing URLs
- Configure app review information

### 3. **Build Selection**
- Select the uploaded build
- Add build notes for Apple review
- Configure release options

### 4. **Submit for Review**
- Answer App Review questions
- Provide test account if needed
- Submit for Apple review

---

## ⏱️ Review Timeline

- **Standard Review**: 7-10 days
- **Expedited Review**: 2-3 days (limited requests)
- **Common Rejections**: Missing info, UI issues, crashes

---

## 🔍 Current Issues to Fix

### 1. **Code Signing** ❌
```
Error: Signing for "YoraaApp" requires a development team
```
**Solution**: Add Apple Developer Team in Xcode

### 2. **Bundle Identifier** ⚠️
```
Current: org.reactjs.native.example.YoraaApp
Required: com.yourcompany.yoraa
```

### 3. **App Icons** ⚠️
Need proper app icons in all required sizes

### 4. **Privacy Descriptions** ⚠️
Add usage descriptions for any permissions needed

---

## 🎯 Quick Start Commands

Once you have your Apple Developer account:

```bash
# 1. Set up code signing in Xcode first
# 2. Then run these commands:

cd ios

# Clean build
xcodebuild clean -workspace YoraaApp.xcworkspace -scheme YoraaApp

# Archive for distribution
xcodebuild -workspace YoraaApp.xcworkspace \
           -scheme YoraaApp \
           -configuration Release \
           -destination generic/platform=iOS \
           archive -archivePath YoraaApp.xcarchive

# Upload to App Store (after setting up export options)
xcodebuild -exportArchive \
           -archivePath YoraaApp.xcarchive \
           -exportPath ./AppStore \
           -exportOptionsPlist exportOptions.plist
```

---

## 📞 Support

- **Apple Developer Support**: https://developer.apple.com/support/
- **App Store Connect Help**: https://help.apple.com/app-store-connect/
- **Human Interface Guidelines**: https://developer.apple.com/design/human-interface-guidelines/

---

**Next Steps**: Get your Apple Developer account, then we can configure Xcode and build for the App Store! 🚀
