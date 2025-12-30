# 📖 Dokumentasi Index

Panduan lengkap untuk Property Rental App

## 🚀 Mulai Cepat

| File | Deskripsi |
|------|-----------|
| **[START_HERE.md](START_HERE.md)** | **Mulai di sini!** Panduan pertama untuk memulai |
| **[QUICKSTART.md](QUICKSTART.md)** | Setup dalam 5 menit |

## 📚 Dokumentasi Utama

| File | Deskripsi |
|------|-----------|
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Ringkasan lengkap project |
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | Panduan setup detail |
| [API_INTEGRATION.md](API_INTEGRATION.md) | Dokumentasi API backend |
| [CHECKLIST.md](CHECKLIST.md) | Development checklist |

## 📂 Struktur Project

```
testApp/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── PropertyCard.tsx
│   │   ├── Loading.tsx
│   │   └── ErrorBoundary.tsx
│   │
│   ├── screens/          # App screens
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── RegisterScreen.tsx
│   │   ├── home/
│   │   │   └── HomeScreen.tsx
│   │   ├── property/
│   │   │   ├── PropertyDetailScreen.tsx
│   │   │   ├── CreatePropertyScreen.tsx
│   │   │   └── EditPropertyScreen.tsx
│   │   ├── FavoritesScreen.tsx
│   │   ├── BookingsScreen.tsx
│   │   └── ProfileScreen.tsx
│   │
│   ├── navigation/       # Navigation setup
│   │   ├── RootNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   ├── MainNavigator.tsx
│   │   └── HomeNavigator.tsx
│   │
│   ├── services/         # API services
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── propertyService.ts
│   │   └── bookingService.ts
│   │
│   ├── context/         # React Context
│   │   └── AuthContext.tsx
│   │
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   │
│   ├── constants/       # App constants
│   │   ├── colors.ts
│   │   └── index.ts
│   │
│   ├── utils/           # Utility functions
│   │   ├── storage.ts
│   │   └── helpers.ts
│   │
│   ├── config/          # Configuration
│   │   └── env.ts
│   │
│   └── styles/          # Common styles
│       └── common.ts
│
├── android/             # Android native code
├── ios/                 # iOS native code
└── docs/               # Documentation (this folder)
```

## 🎯 Fitur

### ✅ Sudah Diimplementasi

- **Authentication**
  - Register dengan validasi
  - Login dengan JWT token
  - Auto-login dengan stored token
  - Logout

- **Property Management**
  - List properties (all & featured)
  - Property detail dengan image gallery
  - Create property dengan validasi
  - Edit property
  - Upload multiple images
  - Amenities selection

- **Favorites**
  - Add/remove dari favorites
  - View favorites list
  - Sync dengan backend

- **Reviews & Ratings**
  - Rate properties (1-5 stars)
  - Write reviews
  - View property ratings

- **Bookings**
  - Create booking
  - View booking history
  - Cancel booking
  - Booking status tracking

- **Profile**
  - View profile
  - Edit profile
  - Upload avatar
  - Logout

- **UI/UX**
  - Responsive design
  - Loading states
  - Error handling
  - Empty states
  - Pull to refresh
  - Bottom tab navigation
  - Stack navigation

## 🛠️ Tech Stack

- React Native 0.83.1
- TypeScript
- React Navigation 6
- Axios
- AsyncStorage
- Vector Icons
- Image Picker
- Gesture Handler

## 📱 Screens Overview

| Screen | Route | Description |
|--------|-------|-------------|
| Login | `/auth/login` | User login |
| Register | `/auth/register` | User registration |
| Home | `/home` | Property listing & search |
| Property Detail | `/property/:id` | Property details |
| Create Property | `/property/create` | Add new property |
| Edit Property | `/property/edit/:id` | Edit existing property |
| Favorites | `/favorites` | User's favorite properties |
| Bookings | `/bookings` | User's booking history |
| Profile | `/profile` | User profile & settings |

## 🔌 API Integration

### Required Endpoints

**Authentication:**
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `POST /auth/logout`

**Properties:**
- `GET /properties`
- `GET /properties/:id`
- `POST /properties`
- `PUT /properties/:id`
- `DELETE /properties/:id`

**Reviews:**
- `GET /properties/:id/reviews`
- `POST /reviews`

**Favorites:**
- `GET /favorites`
- `POST /favorites`
- `DELETE /favorites/:id`

**Bookings:**
- `GET /bookings`
- `POST /bookings`
- `PATCH /bookings/:id/cancel`

Detail lengkap: [API_INTEGRATION.md](API_INTEGRATION.md)

## 🎨 Theming

### Colors
Definisi di `src/constants/colors.ts`:
- Primary: `#FF385C` (Red/Pink)
- Secondary: `#00A699` (Teal)
- Success: `#00A699`
- Error: `#C13515`
- Warning: `#FFB400`

### Typography
- Title: 24px, Bold
- Subtitle: 16px, Regular
- Body: 14px, Regular
- Caption: 12px, Regular

## 🧪 Testing

### Manual Testing Checklist

**Authentication Flow:**
1. [ ] Register new user
2. [ ] Login with credentials
3. [ ] Stay logged in after app restart
4. [ ] Logout successfully

**Property Management:**
1. [ ] View property list
2. [ ] See featured properties
3. [ ] View property detail
4. [ ] Create new property
5. [ ] Upload property images
6. [ ] Edit property
7. [ ] Delete property

**Favorites:**
1. [ ] Add to favorites
2. [ ] Remove from favorites
3. [ ] View favorites list

**Bookings:**
1. [ ] Create booking
2. [ ] View bookings
3. [ ] Cancel booking

## 🚀 Deployment

### Android
```bash
cd android
./gradlew assembleRelease
```

### iOS
```bash
cd ios
xcodebuild -workspace testApp.xcworkspace \
  -scheme testApp archive
```

## 📞 Support

### Common Issues

**Metro bundler:**
```bash
npm start -- --reset-cache
```

**iOS build:**
```bash
cd ios && pod install && cd ..
```

**Android build:**
```bash
cd android && ./gradlew clean && cd ..
```

## 📄 License

MIT License

---

## 🎯 Next Steps

1. [ ] Update `API_BASE_URL` in `src/constants/index.ts`
2. [ ] Setup backend API
3. [ ] Test all features
4. [ ] Add app icon & splash screen
5. [ ] Configure push notifications (optional)
6. [ ] Setup analytics (optional)
7. [ ] Deploy to stores

---

**Selamat Mengembangkan Aplikasi! 🚀**

Untuk memulai, buka [START_HERE.md](START_HERE.md)
