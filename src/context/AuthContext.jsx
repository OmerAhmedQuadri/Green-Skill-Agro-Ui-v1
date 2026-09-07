import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, MOCK_USERS } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => authService.getCurrentUser());
  const [authLoading, setAuthLoading] = useState(false);
  const [authView, setAuthView] = useState('login'); // 'login' | 'signup' | 'forgot-password'
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const loginWithEmail = async (email, password, rememberMe = false) => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const { user } = await authService.loginWithEmail(email, password, rememberMe);
      setCurrentUser(user);
      return user;
    } catch (err) {
      setAuthError(err.message || 'Failed to login');
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const { user } = await authService.loginWithGoogle();
      setCurrentUser(user);
      return user;
    } catch (err) {
      setAuthError(err.message || 'Google Authentication failed');
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (userData) => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const { user } = await authService.signup(userData);
      setCurrentUser(user);
      return user;
    } catch (err) {
      setAuthError(err.message || 'Registration failed');
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const sendPasswordReset = async (email) => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const res = await authService.resetPassword(email);
      return res;
    } catch (err) {
      setAuthError(err.message || 'Password reset request failed');
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    setAuthView('login');
    setAuthError('');
  };

  const updateProfilePhoto = async (photoUrl) => {
    const updatedUser = await authService.updateProfilePhoto(photoUrl);
    if (updatedUser) {
      setCurrentUser({ ...updatedUser });
    }
    return updatedUser;
  };

  // Quick Demo User Switcher Helper for Auth Screen Testing
  const loginAsDemoUser = async (roleKey) => {
    const target = MOCK_USERS.find((u) => u.roleKey === roleKey);
    if (target) {
      return await loginWithEmail(target.email, target.password, true);
    }
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    authLoading,
    authView,
    setAuthView,
    authError,
    setAuthError,
    loginWithEmail,
    loginWithGoogle,
    register,
    sendPasswordReset,
    logout,
    updateProfilePhoto,
    loginAsDemoUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
