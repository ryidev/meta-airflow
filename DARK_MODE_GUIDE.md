# Dark Mode Implementation Guide

## Setup Instructions

Untuk mengaktifkan dark mode di aplikasi, ikuti langkah-langkah berikut:

### 1. Install Dependencies

Pastikan package berikut sudah terinstall:

```bash
npm install @react-native-async-storage/async-storage
```

atau

```bash
yarn add @react-native-async-storage/async-storage
```

### 2. Wrap App dengan ThemeProvider

Edit file `App.tsx` untuk membungkus aplikasi dengan `ThemeProvider`:

```tsx
import { ThemeProvider } from './src/context/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
};

export default App;
```

### 3. Menggunakan Theme di Component

Untuk menggunakan theme di component apapun:

```tsx
import { useTheme } from '../../context/ThemeContext';

const MyComponent = () => {
  const { colors, theme, themeMode, setThemeMode } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text }}>Hello World</Text>
    </View>
  );
};
```

## Fitur yang Sudah Diimplementasi

### 1. **Theme Context** (`src/context/ThemeContext.tsx`)
- Light mode dan Dark mode
- Auto mode (mengikuti system preference)
- Persistent storage (theme tersimpan setelah app ditutup)
- Complete color palette untuk kedua mode

### 2. **Settings Screen** (`src/screens/profile/SettingProf.tsx`)

#### A. Appearance
- **Theme Selector**: Light Mode, Dark Mode, Auto (System)

#### B. Security & Access
- **Biometric Login**: Face ID / Touch ID untuk login cepat
- **Two-Factor Authentication**: Keamanan berlapis dengan 2FA
- **Linked Devices**: Melihat perangkat yang login ke akun

#### C. Notifications
- **Chat Messages**: Notifikasi dari pemilik properti
- **Payment Reminders**: Pengingat jatuh tempo pembayaran
- **Property Updates**: Notifikasi properti baru sesuai wishlist

#### D. Transaction & Privacy
- **Payment Methods**: Manage kartu kredit dan e-wallet
- **Currency**: Pilih mata uang (IDR, USD, EUR)
- **Location Access**: Izin akses lokasi GPS

#### E. Help & Legal
- **Help Center**: FAQ dan artikel bantuan
- **Privacy Policy**: Kebijakan privasi data
- **Terms & Conditions**: Syarat dan ketentuan layanan

#### F. Account
- **Delete Account**: Hapus akun permanen (required by App Store)

## Color Palette

### Light Mode Colors
```typescript
{
  primary: '#FF385C',
  secondary: '#00A699',
  background: '#FFFFFF',
  surface: '#F7F7F7',
  card: '#FFFFFF',
  text: '#222222',
  textSecondary: '#717171',
  border: '#DDDDDD',
  ...
}
```

### Dark Mode Colors
```typescript
{
  primary: '#FF385C',
  secondary: '#00A699',
  background: '#121212',
  surface: '#1E1E1E',
  card: '#2C2C2C',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  border: '#3C3C3C',
  ...
}
```

## Migration untuk Component Lain

Untuk mengupdate component lain agar support dark mode:

### Before:
```tsx
import { Colors } from '../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  text: {
    color: Colors.text,
  },
});
```

### After:
```tsx
import { useTheme } from '../context/ThemeContext';

const MyComponent = () => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text }}>Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

## Testing

1. Buka app dan navigate ke **Profile → Settings**
2. Tap pada **Theme** di bagian Appearance
3. Pilih **Light Mode**, **Dark Mode**, atau **Auto**
4. Theme akan langsung berubah dan tersimpan
5. Tutup app dan buka kembali - theme preference tetap tersimpan

## Notes

- Theme preference disimpan di AsyncStorage dengan key `@app_theme_mode`
- Auto mode akan mengikuti system dark mode setting
- Semua component yang menggunakan `useTheme()` akan otomatis update saat theme berubah
- Switch components menggunakan custom track colors untuk konsistensi di kedua theme
