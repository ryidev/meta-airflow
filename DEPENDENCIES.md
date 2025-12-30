# 📦 Dependencies & Requirements

Dokumentasi lengkap untuk semua dependencies yang digunakan dalam project ini.

---

## 📱 React Native Core

### react-native (0.83.1)
Framework utama untuk build mobile apps dengan React.

**Website:** https://reactnative.dev/  
**Docs:** https://reactnative.dev/docs/getting-started

**Features Used:**
- Components: View, Text, Image, ScrollView, FlatList, TouchableOpacity
- APIs: Alert, StatusBar, Platform, Dimensions
- Hooks: useState, useEffect, useCallback

---

## 🧭 Navigation

### @react-navigation/native (^7.1.26)
Core library untuk navigation di React Native.

**Website:** https://reactnavigation.org/  
**Installation:**
```bash
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context
```

### @react-navigation/stack (^7.6.13)
Stack navigator untuk push/pop navigation.

**Usage:**
- Login/Register flow
- Property detail navigation
- Edit property screens

**Installation:**
```bash
npm install @react-navigation/stack
npm install react-native-gesture-handler
```

### @react-navigation/bottom-tabs (^7.9.0)
Tab navigator untuk bottom navigation bar.

**Usage:**
- Main app navigation (Home, Favorites, Bookings, Profile)

**Installation:**
```bash
npm install @react-navigation/bottom-tabs
```

**Dependencies:**
- `react-native-screens` (^4.19.0)
- `react-native-safe-area-context` (^5.5.2)
- `react-native-gesture-handler` (^2.30.0)

---

## 🌐 Networking

### axios (^1.13.2)
HTTP client untuk API requests.

**Website:** https://axios-http.com/  
**Installation:**
```bash
npm install axios
```

**Features Used:**
- Request/Response interceptors
- Token authentication
- Error handling
- Multipart form data upload

**Configuration:**
```typescript
// src/services/api.ts
axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})
```

---

## 💾 Storage

### @react-native-async-storage/async-storage (^2.2.0)
Persistent key-value storage for React Native.

**Website:** https://react-native-async-storage.github.io/async-storage/  
**Installation:**
```bash
npm install @react-native-async-storage/async-storage
```

**Usage:**
- JWT token storage
- User data caching
- App preferences

**iOS Setup:**
```bash
cd ios && pod install
```

---

## 🎨 UI Components & Icons

### react-native-vector-icons (^10.3.0)
Icon library dengan berbagai icon sets.

**Website:** https://github.com/oblador/react-native-vector-icons  
**Installation:**
```bash
npm install react-native-vector-icons
npm install --save-dev @types/react-native-vector-icons
```

**Icon Sets Used:**
- **Ionicons** - Main icons (login, register, navigation)
- MaterialCommunityIcons - Additional UI icons
- MaterialIcons - Standard material icons
- FontAwesome - Social & utility icons

**iOS Setup:**
```bash
cd ios && pod install
```

**Android Setup:**
Add to `android/app/build.gradle`:
```gradle
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
```

---

## 📷 Media

### react-native-image-picker (^8.2.1)
Image/Video picker untuk upload dari gallery atau camera.

**Website:** https://github.com/react-native-image-picker/react-native-image-picker  
**Installation:**
```bash
npm install react-native-image-picker
```

**Features:**
- Gallery selection
- Camera capture
- Multi-image selection
- Image compression

**iOS Setup:**
Add to `ios/testApp/Info.plist`:
```xml
<key>NSPhotoLibraryUsageDescription</key>
<string>App needs access to photo library</string>
<key>NSCameraUsageDescription</key>
<string>App needs access to camera</string>
```

**Android Setup:**
Add to `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

---

## 🎯 Gestures & Interactions

### react-native-gesture-handler (^2.30.0)
Gesture handling library untuk React Navigation.

**Website:** https://docs.swmansion.com/react-native-gesture-handler/  
**Installation:**
```bash
npm install react-native-gesture-handler
```

**Required Setup:**

**index.js (TOP OF FILE):**
```javascript
import 'react-native-gesture-handler';
```

**App.tsx:**
```jsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';

<GestureHandlerRootView style={{ flex: 1 }}>
  {/* App content */}
</GestureHandlerRootView>
```

**iOS:**
```bash
cd ios && pod install
```

---

## 📐 Layout & UI

### react-native-safe-area-context (^5.5.2)
Safe area boundaries untuk notch/home indicator.

**Website:** https://github.com/th3rdwave/react-native-safe-area-context  
**Installation:**
```bash
npm install react-native-safe-area-context
```

**Usage:**
```jsx
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
```

**iOS:**
```bash
cd ios && pod install
```

### react-native-screens (^4.19.0)
Native screen optimization untuk React Navigation.

**Website:** https://github.com/software-mansion/react-native-screens  
**Installation:**
```bash
npm install react-native-screens
```

**iOS:**
```bash
cd ios && pod install
```

---

## 🔧 Development Dependencies

### TypeScript (^5.8.3)
Type safety untuk JavaScript.

**Installation:**
```bash
npm install --save-dev typescript @types/react @types/react-native
```

### @types/react-native-vector-icons (^6.4.18)
Type definitions untuk react-native-vector-icons.

```bash
npm install --save-dev @types/react-native-vector-icons
```

### ESLint (^8.19.0)
Code linting untuk maintain code quality.

**Config:** `.eslintrc.js`

### Jest (^29.6.3)
Testing framework.

**Config:** `jest.config.js`

### Prettier (2.8.8)
Code formatter.

**Config:** `.prettierrc.js`

---

## 📊 Complete Dependencies List

### Production Dependencies
```json
{
  "@react-native-async-storage/async-storage": "^2.2.0",
  "@react-navigation/bottom-tabs": "^7.9.0",
  "@react-navigation/native": "^7.1.26",
  "@react-navigation/stack": "^7.6.13",
  "axios": "^1.13.2",
  "react": "19.2.0",
  "react-native": "0.83.1",
  "react-native-gesture-handler": "^2.30.0",
  "react-native-image-picker": "^8.2.1",
  "react-native-safe-area-context": "^5.5.2",
  "react-native-screens": "^4.19.0",
  "react-native-vector-icons": "^10.3.0"
}
```

### Development Dependencies
```json
{
  "@babel/core": "^7.25.2",
  "@babel/preset-env": "^7.25.3",
  "@babel/runtime": "^7.25.0",
  "@react-native-community/cli": "20.0.0",
  "@react-native/babel-preset": "0.83.1",
  "@react-native/eslint-config": "0.83.1",
  "@react-native/metro-config": "0.83.1",
  "@react-native/typescript-config": "0.83.1",
  "@types/jest": "^29.5.13",
  "@types/react": "^19.2.0",
  "@types/react-native-vector-icons": "^6.4.18",
  "@types/react-test-renderer": "^19.1.0",
  "eslint": "^8.19.0",
  "jest": "^29.6.3",
  "prettier": "2.8.8",
  "react-test-renderer": "19.2.0",
  "typescript": "^5.8.3"
}
```

---

## 🚀 Installation Commands

### Complete Setup
```bash
# Install all dependencies
npm install

# iOS - Install CocoaPods dependencies
cd ios && pod install && cd ..

# Verify installation
npx react-native doctor
```

### Individual Package Installation

**Navigation:**
```bash
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler
```

**Networking & Storage:**
```bash
npm install axios @react-native-async-storage/async-storage
```

**UI & Media:**
```bash
npm install react-native-vector-icons react-native-image-picker
npm install --save-dev @types/react-native-vector-icons
```

**iOS Native Setup:**
```bash
cd ios
pod install
cd ..
```

---

## 🔄 Update Dependencies

### Check Outdated Packages
```bash
npm outdated
```

### Update All (Carefully)
```bash
npm update
```

### Update Specific Package
```bash
npm install package-name@latest
```

### Update React Native (Major Version)
Follow official guide: https://react-native-community.github.io/upgrade-helper/

---

## ⚠️ Known Issues & Solutions

### Issue: Metro Bundler Port Conflict
**Solution:**
```bash
npx react-native start --port 8082
```

### Issue: CocoaPods Failed
**Solution:**
```bash
cd ios
rm -rf Pods Podfile.lock
pod cache clean --all
pod install
cd ..
```

### Issue: Gradle Build Failed
**Solution:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Issue: Type Errors for Icons
**Solution:**
```bash
npm install --save-dev @types/react-native-vector-icons
```

---

## 📱 Platform-Specific Requirements

### iOS Requirements
- **macOS** with Xcode installed
- **CocoaPods** (installed via Homebrew or Ruby Gems)
- **iOS 13.4+** as deployment target

### Android Requirements
- **JDK 17**
- **Android Studio** with SDK
- **Android SDK Platform 34**
- **Android SDK Build-Tools 34.0.0**

---

## 🔗 Useful Links

- **React Native Docs:** https://reactnative.dev/docs/getting-started
- **React Navigation:** https://reactnavigation.org/docs/getting-started
- **TypeScript Handbook:** https://www.typescriptlang.org/docs/
- **React Native Directory:** https://reactnative.directory/
- **Awesome React Native:** https://github.com/jondot/awesome-react-native

---

## 📞 Support & Community

- **React Native Discord:** https://discord.gg/reactiflux
- **Stack Overflow:** https://stackoverflow.com/questions/tagged/react-native
- **GitHub Discussions:** https://github.com/facebook/react-native/discussions

---

## 📈 Version Compatibility Matrix

| Package | Version | React Native | Node | iOS | Android |
|---------|---------|--------------|------|-----|---------|
| react-native | 0.83.1 | - | 20+ | 13.4+ | API 24+ |
| react-navigation | 7.x | 0.63+ | 18+ | 13.4+ | API 21+ |
| axios | 1.x | Any | 14+ | Any | Any |
| async-storage | 2.x | 0.60+ | 16+ | 13.0+ | API 21+ |
| vector-icons | 10.x | 0.60+ | 16+ | 13.0+ | API 21+ |
| image-picker | 8.x | 0.70+ | 18+ | 13.0+ | API 24+ |

---

**Last Updated:** December 31, 2025  
**React Native Version:** 0.83.1  
**Node Version:** 20+
