# 🚀 Quick Setup Guide

Setup aplikasi dalam 5 menit!

## 📦 Step 1: Install Dependencies (Sudah Selesai ✅)

Dependencies sudah terinstall:
- React Navigation
- Axios
- AsyncStorage
- Vector Icons
- Image Picker
- Gesture Handler
- TypeScript types

## ⚙️ Step 2: Konfigurasi API

Edit `src/constants/index.ts`:

```typescript
export const API_BASE_URL = 'https://your-backend-api.com/api';
```

## 📱 Step 3: Jalankan Aplikasi

### iOS (Mac Only)
```bash
# Install pods (first time)
cd ios && pod install && cd ..

# Run
npm run ios
```

### Android
```bash
# Run
npm run android
```

## 🎯 Step 4: Test Aplikasi

1. **Register** - Buat akun baru
2. **Login** - Login dengan akun tersebut
3. **Home** - Lihat list properti
4. **Create Property** - Tap tombol + untuk tambah properti
5. **Favorites** - Tap heart icon
6. **Profile** - Lihat profile Anda

## 📋 Checklist

- [ ] Update `API_BASE_URL`
- [ ] Backend API ready
- [ ] Run `npm run ios` atau `npm run android`
- [ ] Test register/login
- [ ] Test create property
- [ ] Test favorites
- [ ] Test bookings

## 🔧 Common Issues

**Metro tidak jalan:**
```bash
npm start -- --reset-cache
```

**Build error:**
```bash
# iOS
cd ios && pod install && cd ..

# Android  
cd android && ./gradlew clean && cd ..
```

**TypeScript error:**
```bash
npm install
```

## 📚 Next Steps

1. Implement backend API
2. Test semua features
3. Add app icon & splash screen
4. Deploy ke store

## 💡 Tips

- Use React DevTools untuk debug
- Check Metro console untuk errors
- Test di device fisik untuk best experience

---

**Happy Coding! 🎉**

Baca `START_HERE.md` untuk detail lengkap.
