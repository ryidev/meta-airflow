# 🏠 Property Rental App - React Native

Modern property rental mobile application built with React Native 0.83.1 and TypeScript.

---

## 📚 Documentation

- **[START_HERE.md](START_HERE.md)** - Panduan utama untuk memulai
- **[QUICKSTART.md](QUICKSTART.md)** - Setup cepat 5 menit
- **[RUN_GUIDE.md](RUN_GUIDE.md)** - Cara menjalankan aplikasi
- **[DEPENDENCIES.md](DEPENDENCIES.md)** - Daftar lengkap dependencies
- **[ANDROID_SETUP_WINDOWS.md](ANDROID_SETUP_WINDOWS.md)** - Setup Android di Windows
- **[API_INTEGRATION.md](API_INTEGRATION.md)** - Dokumentasi API
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Panduan troubleshooting
- **[QUICK_FIX.md](QUICK_FIX.md)** - Quick reference untuk error umum

---

## ✨ Features

### Authentication
- ✅ Login & Register dengan validasi
- ✅ Forgot Password dengan email reset
- ✅ JWT Token authentication
- ✅ Auto-login persistence
- 🔜 OAuth (Google Sign-In)

### Property Management
- ✅ Property listing dengan featured properties
- ✅ Property detail dengan image gallery
- ✅ Create property dengan multi-image upload
- ✅ Edit property
- ✅ Search & filter properties
- ✅ Amenities selection

### User Features
- ✅ Favorites/Wishlist
- ✅ Booking system
- ✅ User profile management
- ✅ Avatar upload
- ✅ Rating & reviews
- 🔜 Price prediction (AI)

### UI/UX
- ✅ Responsive design
- ✅ Bottom tab navigation
- ✅ Stack navigation
- ✅ Loading states
- ✅ Error handling
- ✅ Pull to refresh
- ✅ Onboarding screen

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- React Native CLI
- **iOS:** macOS with Xcode & CocoaPods
- **Android:** JDK 17 + Android Studio

### Installation

```bash
# Clone repository
git clone YOUR_REPO_URL
cd testApp

# Install dependencies
npm install

# iOS setup
cd ios && pod install && cd ..

# Android setup - Already configured!
```

### Run Application

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

**Metro Bundler:**
```bash
npm start
```

Lihat [RUN_GUIDE.md](RUN_GUIDE.md) untuk instruksi lengkap.

---

## 📦 Tech Stack

- **Framework:** React Native 0.83.1
- **Language:** TypeScript 5.8.3
- **Navigation:** React Navigation 7 (Stack & Bottom Tabs)
- **HTTP Client:** Axios
- **Storage:** AsyncStorage
- **Icons:** React Native Vector Icons (Ionicons)
- **Image Picker:** React Native Image Picker
- **Gestures:** React Native Gesture Handler

Lihat [DEPENDENCIES.md](DEPENDENCIES.md) untuk detail lengkap.

---

## 📱 Screens

### Authentication Flow
- **OnboardingScreen** - Welcome screen dengan property images
- **LoginScreen** - Email/password login dengan social auth option
- **RegisterScreen** - Sign up dengan validasi
- **ForgotPasswordScreen** - Reset password via email

### Main App
- **HomeScreen** - Property listing & featured properties
- **PropertyDetailScreen** - Property info dengan image gallery
- **CreatePropertyScreen** - Add new property dengan images
- **EditPropertyScreen** - Update property data
- **FavoritesScreen** - User's saved properties
- **BookingsScreen** - User's booking history
- **ProfileScreen** - User profile & settings

---

## 🏗️ Project Structure

```
testApp/
├── src/
│   ├── components/        # Reusable components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── PropertyCard.tsx
│   │   ├── Loading.tsx
│   │   └── ErrorBoundary.tsx
│   ├── screens/          # Screen components
│   │   ├── auth/         # Auth screens
│   │   ├── home/         # Home screens
│   │   ├── property/     # Property screens
│   │   └── OnboardingScreen.tsx
│   ├── navigation/       # Navigation setup
│   │   ├── RootNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   ├── MainNavigator.tsx
│   │   └── HomeNavigator.tsx
│   ├── services/         # API services
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── propertyService.ts
│   │   └── bookingService.ts
│   ├── context/          # React Context
│   │   └── AuthContext.tsx
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   ├── utils/            # Utility functions
│   │   ├── storage.ts
│   │   └── helpers.ts
│   ├── constants/        # App constants
│   │   ├── colors.ts
│   │   └── index.ts
│   └── styles/           # Common styles
│       └── common.ts
├── android/              # Android native code
├── ios/                  # iOS native code
├── App.tsx               # App entry point
└── index.js              # Root entry point
```

---

## 🔧 Configuration

### Update API URL

Edit `src/constants/index.ts`:
```typescript
export const API_BASE_URL = 'YOUR_API_URL';
```

### Environment Variables

Create `.env` file (optional):
```env
API_BASE_URL=https://your-api.com/api
```

---

## 🎨 Customization

### Colors

Edit `src/constants/colors.ts`:
```typescript
export const Colors = {
  primary: '#6366F1',      // Indigo
  secondary: '#10B981',    // Green
  // ... more colors
};
```

### Fonts

iOS: Add fonts to `ios/testApp/Fonts/`  
Android: Add fonts to `android/app/src/main/assets/fonts/`

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

---

## 📤 Build Release

### Android APK
```bash
cd android
./gradlew assembleRelease
```

Output: `android/app/build/outputs/apk/release/`

### iOS
```bash
# Open Xcode
open ios/testApp.xcworkspace

# Product → Archive
```

---

## 🐛 Common Issues

### Error: Metro Port 8081 Busy
```bash
lsof -ti:8081 | xargs kill -9
npm start
```

### Error: CocoaPods Failed
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

### Error: Gradle Build Failed
```bash
cd android
./gradlew clean
cd ..
npm run android
```

Lihat [TROUBLESHOOTING.md](TROUBLESHOOTING.md) untuk lebih lengkap.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Authors

- Your Team Name

---

## 🙏 Acknowledgments

- React Native Team
- React Navigation Team
- All contributors

---

## 📞 Support

- Email: support@yourapp.com
- GitHub Issues: [Create an issue](YOUR_REPO_URL/issues)
- Documentation: [See docs](./START_HERE.md)

---

**Built with ❤️ using React Native**

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
