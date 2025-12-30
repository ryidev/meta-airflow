# ⚡ Quick Reference - Error "Runtime Not Ready"

## 🎯 Solusi Cepat (90% Berhasil)

### Opsi 1: Gunakan Script Otomatis
```bash
./fix.sh
```
Pilih opsi 1 (Quick Fix)

### Opsi 2: Manual Quick Fix
```bash
# Stop Metro
pkill -f "node.*metro"

# Clear cache & restart
rm -rf node_modules/.cache
npx react-native start --reset-cache
```

**Kemudian di terminal baru:**
```bash
npx react-native run-android
# atau
npx react-native run-ios
```

---

## 🔥 Masih Error? Coba Ini

### Clean Build Android
```bash
cd android && ./gradlew clean && cd ..
npx react-native start --reset-cache

# Terminal baru:
npx react-native run-android
```

### Clean Build iOS
```bash
cd ios && rm -rf Pods && pod install && cd ..
npx react-native start --reset-cache

# Terminal baru:
npx react-native run-ios
```

---

## 🚨 Nuclear Option (Terakhir)
```bash
# Gunakan script
./fix.sh
# Pilih opsi 4 (Nuclear Clean)

# Kemudian:
npm install
cd ios && pod install && cd ..  # iOS only
npx react-native start --reset-cache
```

---

## 📋 Checklist Debug

Cek satu per satu:

- [ ] Metro bundler running tanpa error?
- [ ] Port 8081 tidak dipakai proses lain?
- [ ] Device/emulator connected? (`adb devices`)
- [ ] Node version >= 20? (`node -v`)
- [ ] Semua dependencies installed? (`npm install`)
- [ ] iOS pods installed? (`cd ios && pod install`)

---

## 🛠️ Quick Commands

| Problem | Command |
|---------|---------|
| Port 8081 busy | `lsof -ti:8081 \| xargs kill` |
| Metro not stopping | `pkill -f "node.*metro"` |
| Clear Metro cache | `npx react-native start --reset-cache` |
| Check devices (Android) | `adb devices` |
| Check simulators (iOS) | `xcrun simctl list devices` |
| View Android logs | `npx react-native log-android` |
| View iOS logs | `npx react-native log-ios` |
| Reload app | Press `r` in Metro terminal |
| Open Dev Menu | Press `d` in Metro terminal |

---

## 📱 Run Commands

### Standard Run
```bash
# Terminal 1:
npm start

# Terminal 2:
npm run android  # atau npm run ios
```

### With Cache Reset (Recommended saat error)
```bash
# Terminal 1:
npx react-native start --reset-cache

# Terminal 2:
npx react-native run-android --no-packager
# atau
npx react-native run-ios --no-packager
```

---

## 💡 Pro Tips

### Selalu gunakan cache reset saat development
```bash
# Tambahkan ke package.json
"scripts": {
  "start": "react-native start --reset-cache",
  "android:clean": "cd android && ./gradlew clean && cd .. && npm run android",
  "ios:clean": "cd ios && rm -rf Pods && pod install && cd .. && npm run ios"
}
```

### Buat alias di ~/.zshrc atau ~/.bashrc
```bash
alias rn-start="npx react-native start --reset-cache"
alias rn-android="npx react-native run-android"
alias rn-ios="npx react-native run-ios"
alias rn-fix="./fix.sh"
```

---

## 📚 More Help

- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Detailed guide
- [RUN_GUIDE.md](RUN_GUIDE.md) - Complete run instructions

---

**Remember:** 
1. ✅ Metro bundler HARUS running dulu
2. ✅ Gunakan `--reset-cache` saat ada masalah
3. ✅ Clean build jika masih error
4. ✅ Nuclear clean jika desperate 😅

**Good luck! 🚀**
