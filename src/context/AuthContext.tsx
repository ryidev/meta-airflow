import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../types';
import { authService } from '../services/authService';
import { storageService } from '../utils/storage';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials, authResponse?: AuthResponse) => Promise<void>;
  register: (data: RegisterData, authResponse?: AuthResponse) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await storageService.getToken();
      if (token) {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      }
    } catch (error: any) {
      // Ignore 404 as it means user is not authenticated
      if (error.response?.status !== 404) {
        console.error('Error checking auth status:', error);
      }
      await storageService.clearAll();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials, authResponse?: AuthResponse) => {
    try {
      const response = authResponse || await authService.login(credentials);
      await storageService.saveToken(response.token);
      if (response.refreshToken) {
        await storageService.setRefreshToken(response.refreshToken);
      }
      await storageService.saveUserData(response.user);
      setUser(response.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (data: RegisterData, authResponse?: AuthResponse) => {
    try {
      const response = authResponse || await authService.register(data);
      await storageService.saveToken(response.token);
      if (response.refreshToken) {
        await storageService.setRefreshToken(response.refreshToken);
      }
      await storageService.saveUserData(response.user);
      setUser(response.user);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await storageService.clearAll();
      setUser(null);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      storageService.saveUserData(updatedUser);
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    // Save original user state for rollback
    const originalUser = user;

    try {
      console.log('Calling updateProfile API with data:', userData);

      // Optimistic update: immediately update local state with the data we're sending
      if (user) {
        const optimisticUser = { ...user, ...userData };
        console.log('Optimistically updating user to:', optimisticUser);
        setUser(optimisticUser);
        await storageService.saveUserData(optimisticUser);
      }

      // Call API - this is critical for backend persistence
      await authService.updateProfile(userData);
      console.log('API call completed successfully - data should be saved on backend');

      // Verify by fetching updated user from backend
      try {
        const updatedUser = await authService.getCurrentUser();
        console.log('Fetched updated user from backend:', JSON.stringify(updatedUser, null, 2));
        console.log('Updated user profilePicture:', updatedUser.profilePicture);
        console.log('Updated user avatar:', updatedUser.avatar);

        setUser(updatedUser);
        await storageService.saveUserData(updatedUser);
      } catch (fetchError) {
        console.warn('Could not fetch updated user, keeping optimistic update');
      }

      console.log('Profile updated successfully in state');
    } catch (error: any) {
      console.error('Update profile error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);

      // Rollback optimistic update on error
      if (originalUser) {
        console.log('Rolling back to original user data');
        setUser(originalUser);
        await storageService.saveUserData(originalUser);
      }

      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
