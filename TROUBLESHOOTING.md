# 🔧 Troubleshooting Guide

## ❌ Error: "Runtime Not Ready"

Error ini terjadi ketika JavaScript bundle belum selesai di-load saat aplikasi mencoba berjalan.

### ✅ Solusi:

#### 1. **Reset Cache Metro Bundler** (Paling Sering Berhasil)
```bash
# Stop semua Metro process
pkill -f "node.*metro"

# Clear cache dan restart
rm -rf node_modules/.cache
npx react-native start --reset-cache
```

#### 2. **Clean Build & Restart**

**Android:**
```bash
# Clean build
cd android
./gradlew clean
cd ..

# Restart Metro dengan cache reset
npx react-native start --reset-cache

# Di terminal baru, rebuild app
npx react-native run-android
```

**iOS:**
```bash
# Clean build
cd ios
rm -rf build
rm -rf Pods
pod install
cd ..

# Restart Metro dengan cache reset
npx react-native start --reset-cache

# Di terminal baru, rebuild app
npx react-native run-ios
```

#### 3. **Full Clean (Nuclear Option)**
```bash
# Stop Metro
pkill -f "node.*metro"

# Clear all cache
rm -rf node_modules
rm -rf ios/Pods
rm -rf ios/build
rm -rf android/app/build
rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/metro-*

# Reinstall
npm install

# iOS only
cd ios && pod install && cd ..

# Start fresh
npx react-native start --reset-cache
```

---

## 🚨 Common Errors & Solutions

### Error: Port 8081 Already in Use
```bash
# Kill process on port 8081
lsof -ti:8081 | xargs kill

# Or change port
npx react-native start --port 8082
```

### Error: Unable to Resolve Module
```bash
# Clear watchman cache
watchman watch-del-all

# Clear Metro cache
npx react-native start --reset-cache

# Clear node_modules
rm -rf node_modules && npm install
```

### Error: Build Failed (Android)
```bash
# 1. Clean Gradle
cd android
./gradlew clean
cd ..

# 2. Clear Gradle cache
cd android
./gradlew cleanBuildCache
cd ..

# 3. Rebuild
npx react-native run-android
```

### Error: Build Failed (iOS)
```bash
# 1. Clean pods
cd ios
rm -rf Pods Podfile.lock
pod cache clean --all
pod install
cd ..

# 2. Clean build folder
cd ios
xcodebuild clean
cd ..

# 3. Rebuild
npx react-native run-ios
```

### Error: Red Screen - "Element type is invalid"
Ini biasanya circular dependency atau wrong import/export.

**Check:**
1. Semua exports/imports konsisten
2. Tidak ada circular dependency
3. Default export vs named export benar

### Error: Cannot Find Module '@react-navigation/...'
```bash
# Reinstall navigation dependencies
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler
```

### Error: Native Module Cannot Be Found
```bash
# Android - Rebuild
cd android && ./gradlew clean && cd ..
npx react-native run-android

# iOS - Reinstall pods
cd ios && rm -rf Pods && pod install && cd ..
npx react-native run-ios
```

---

## 🔍 Debug Steps

### 1. Check Metro Bundler
Metro harus running tanpa error:
```bash
npx react-native start
```

Lihat output - tidak boleh ada error merah.

### 2. Check Device/Emulator Connection

**Android:**
```bash
adb devices
```
Harus muncul device ID.

**iOS:**
```bash
xcrun simctl list devices
```
Cek emulator yang available.

### 3. Check JavaScript Bundle

Buka browser: `http://localhost:8081/index.bundle?platform=android`

Jika error → masalah di bundling.

### 4. Check Logs

**Android:**
```bash
npx react-native log-android
```

**iOS:**
```bash
npx react-native log-ios
```

---

## 🎯 Quick Fix Checklist

Coba solusi ini secara berurutan:

- [ ] **Reload app** (Double tap R di Android, Cmd+R di iOS)
- [ ] **Restart Metro** dengan `--reset-cache`
- [ ] **Clean build** folder (android/ios)
- [ ] **Reinstall node_modules**
- [ ] **Reinstall pods** (iOS)
- [ ] **Restart computer** (seriously, kadang ini berhasil 😅)

---

## 📱 Device-Specific Issues

### Android Emulator Slow
```bash
# Use ARM emulator or enable hardware acceleration
# AVD Manager → Edit AVD → Graphics: Hardware - GLES 2.0
```

### iOS Simulator Not Opening
```bash
# Open manually
open -a Simulator

# Or specify device
npx react-native run-ios --simulator="iPhone 15"
```

### Device Not Detected
```bash
# Android
adb kill-server
adb start-server
adb devices

# iOS - check cable and trust device
```

---

## 🆘 Still Not Working?

### 1. Check package.json
Pastikan dependencies compatible dengan React Native 0.83.1

### 2. Check app.json
```json
{
  "name": "testApp",
  "displayName": "testApp"
}
```

### 3. Check index.js
Harus ada:
```javascript
import 'react-native-gesture-handler';
```
Di baris paling atas!

### 4. Check App.tsx
```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Your app */}
    </GestureHandlerRootView>
  );
}
```

---

## 💡 Pro Tips

### Clear Everything Script
```bash
#!/bin/bash
# save as clean.sh and chmod +x clean.sh

pkill -f "node.*metro"
rm -rf node_modules
rm -rf ios/Pods ios/build
rm -rf android/app/build
rm -rf $TMPDIR/react-* $TMPDIR/metro-*
watchman watch-del-all 2>/dev/null || true

echo "✅ Cleaned!"
echo "Run: npm install && cd ios && pod install && cd .."
```

### Development Mode
```bash
# Always run with reset cache during development
npm start -- --reset-cache
```

### Production Build Test
```bash
# Android
cd android
./gradlew assembleRelease
cd ..

# iOS
npx react-native run-ios --configuration Release
```

---

## 📞 Need More Help?

1. Check [React Native Docs](https://reactnative.dev/docs/troubleshooting)
2. Check [React Navigation Docs](https://reactnavigation.org/docs/troubleshooting)
3. Search [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)
4. Check GitHub Issues untuk dependencies yang digunakan

---

**Happy Debugging! 🐛🔨**
