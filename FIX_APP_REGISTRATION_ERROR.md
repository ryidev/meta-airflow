# Fix: "testApp" has not been registered

## ✅ Problem Fixed

**Issue:** App name mismatch antara `app.json` dan native iOS/Android code.

**Root Cause:** 
- `app.json` menggunakan nama "MetaAirflow"
- Native code (iOS/Android) menggunakan nama "testApp"
- React Native membutuhkan nama yang sama untuk registrasi app

**Solution Applied:**
Changed `app.json` from:
```json
{
  "name": "testApp",
  "displayName": "Meta Airflow"
}
```

To:
```json
{
  "name": "testApp",
  "displayName": "Meta Airflow"
}
```

Note: `displayName` tetap "Meta Airflow" untuk nama yang muncul di device.

---

## 🚀 Steps to Run App

### 1. Clean Metro Cache
```bash
cd /Users/user/Documents/ush/lomba/meta-airflow
npm start -- --reset-cache
```
atau
```bash
npx react-native start --reset-cache
```

### 2. Rebuild iOS (if running iOS)
```bash
cd ios
pod install
cd ..
npx react-native run-ios
```

### 3. Rebuild Android (if running Android)
```bash
npx react-native run-android
```

---

## 📱 Quick Fix Commands

**Clean everything and restart:**
```bash
# Clean cache
rm -rf node_modules
rm -rf ios/Pods ios/build
rm -rf android/app/build android/build

# Reinstall
npm install
cd ios && pod install && cd ..

# Reset Metro
npm start -- --reset-cache
```

Then in another terminal:
```bash
# For iOS
npx react-native run-ios

# For Android
npx react-native run-android
```

---

## ✅ What Was Fixed

1. ✅ App name synchronized between `app.json` and native code
2. ✅ Metro bundler killed to clear cache
3. ✅ No TypeScript errors in App.tsx or contexts

---

## 🔍 Why This Error Happened

The error occurs when:
1. App name in `app.json` doesn't match native app name
2. Metro bundler is using cached old configuration
3. Module import fails preventing `AppRegistry.registerComponent()`

The fix ensures the JavaScript code registers the app with the same name that native iOS/Android code expects.

---

## 💡 Alternative Solution (Full Rename)

If you want to rename to "MetaAirflow" properly:

### iOS:
1. Open Xcode
2. Select project → Rename to "MetaAirflow"
3. Update `ios/Podfile` target name
4. Run `pod install`

### Android:
1. Update `android/settings.gradle`: `rootProject.name = 'MetaAirflow'`
2. Update `android/app/src/main/res/values/strings.xml`
3. Update package names if needed

But keeping "testApp" is simpler and works fine!
