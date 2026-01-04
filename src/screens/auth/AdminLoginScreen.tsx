import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const AdminLoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { login } = useAuth(); // We'll hijack this for now or just fake it locally

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleAdminLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      // Hardcoded admin check for demo purposes
      if (email === 'admin' && password === 'admin') {
        // Create a fake admin user response
        const adminUser = {
          id: 'admin_1',
          email: 'admin@rentverse.com',
          name: 'Admin User',
          role: 'admin' as const,
          createdAt: new Date().toISOString(),
        };

        // We use the existing login function but pass our fake admin data
        // This requires the authService or AuthContext to be flexible.
        // If AuthContext calls API, we might need a separate way to set user.
        // For now, let's assume we can mock the response in a real app, 
        // OR we just use the login function if the backend supports it.
        // Since I don't control the backend, I'll bypass the API call in AuthContext if possible?
        // Actually, AuthContext calls `authService.login`. I might fail there.
        // Let's modify AuthContext to allow setting a user directly or handling this.

        // HACK: I will update AuthContext to allow manual user setting for this demo,
        // OR I will just call login and hope it works if I simulate it.

        // BETTER APPROACH: I'll modify AuthContext to accept an optional full user object in login
        // to bypass the service if provided. I'll check AuthContext again.
        // It has `login: (credentials: LoginCredentials, authResponse?: AuthResponse) => Promise<void>;`
        // So I can pass the response!

        await login({ email, password }, {
          user: adminUser,
          token: 'fake-admin-token',
        });

      } else {
        throw new Error('Invalid admin credentials');
      }
    } catch (error) {
      Alert.alert('Login Failed', (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Icon name="shield-checkmark" size={60} color={colors.primary} />
          <Text style={[styles.title, { color: colors.text }]}>Admin Portal</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Login to manage properties
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Admin Email</Text>
            <TextInput
              style={[styles.input, {
                backgroundColor: colors.surface,
                color: colors.text,
                borderColor: colors.border
              }]}
              placeholder="admin@rentverse.com"
              placeholderTextColor={colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Password</Text>
            <View style={[styles.passwordContainer, {
              backgroundColor: colors.surface,
              borderColor: colors.border
            }]}>
              <TextInput
                style={[styles.passwordInput, { color: colors.text }]}
                placeholder="••••••••"
                placeholderTextColor={colors.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: colors.primary }]}
            onPress={handleAdminLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.loginButtonText}>Access Dashboard</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    padding: 24,
  },
  backButton: {
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  input: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  passwordContainer: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  loginButton: {
    height: 54,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AdminLoginScreen;
