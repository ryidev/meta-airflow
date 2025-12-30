# 🚀 Panduan Menjalankan Aplikasi

Ini adalah **React Native CLI project** (bukan Expo), jadi tidak bisa menggunakan `npx expo start`.

## 📱 Cara Run Aplikasi

### **Metode 1: Menggunakan 2 Terminal**

#### Terminal 1 - Start Metro Bundler:
```bash
npm start
```

#### Terminal 2 - Run di Device/Emulator:

**Untuk Android:**
```bash
npm run android
```

**Untuk iOS (Mac only):**
```bash
npm run ios
```

---

### **Metode 2: One Command** (Recommended)

**Android:**
```bash
npm run android
```
Metro bundler akan start otomatis.

**iOS:**
```bash
npm run ios
```
Metro bundler akan start otomatis.

---

## ⚙️ Setup Pertama Kali

### **iOS (Mac only):**
```bash
cd ios
pod install
cd ..
npm run ios
```

### **Android:**
1. Pastikan Android Studio sudah terinstall
2. Pastikan emulator sudah running atau device sudah connect
3. Jalankan:
```bash
npm run android
```

---

## 🔧 Troubleshooting

### Metro Bundler tidak bisa stop:
```bash
# Ctrl + C tidak work? Gunakan ini:
npx react-native start --reset-cache

# Atau kill port 8081
lsof -ti:8081 | xargs kill
```

### Build error Android:
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Build error iOS:
```bash
cd ios
rm -rf Pods
pod install
cd ..
npm run ios
```

### Cache issues:
```bash
# Clear all cache
npm start -- --reset-cache

# Atau
npx react-native start --reset-cache
```

---

## 📝 Development Workflow

1. **Start Metro** (Terminal 1):
   ```bash
   npm start
   ```

2. **Run App** (Terminal 2):
   ```bash
   npm run android  # atau npm run ios
   ```

3. **Reload App:**
   - **Android**: Double tap `R` di keyboard atau shake device → Reload
   - **iOS**: Cmd+R di simulator atau shake device → Reload

4. **Open Dev Menu:**
   - **Android**: Cmd+M (Mac) atau Ctrl+M (Windows/Linux)
   - **iOS**: Cmd+D

5. **Enable Fast Refresh:**
   Dev Menu → Enable Fast Refresh (sudah enable by default)

---

## 🔑 Konfigurasi Backend API

Sebelum run, update API URL di:
```
src/constants/index.ts
```

Ubah:
```typescript
export const API_BASE_URL = 'https://your-api-url.com/api';
```

Menjadi URL backend Anda.

---

## 📦 Dependencies

Sudah terinstall:
- ✅ React Navigation
- ✅ Axios
- ✅ AsyncStorage
- ✅ Vector Icons
- ✅ Image Picker
- ✅ Gesture Handler

Tidak perlu install lagi!

---

## 🎯 Ready to Go!

```bash
# Quick Start (Android)
npm run android

# Quick Start (iOS - Mac only)
cd ios && pod install && cd .. && npm run ios
```

**Happy Coding! 🎉**
