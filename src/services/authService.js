/**
 * Green Skill Agro ERP - Authentication Service Layer
 * 
 * BACKEND ENGINEER NOTE:
 * This file encapsulates all authentication logic, user session management,
 * and token persistence. To plug in real backend authentication (JWT / OAuth2),
 * replace the mock methods below with REST API calls to your Auth endpoints:
 *   - POST /api/v1/auth/login
 *   - POST /api/v1/auth/google
 *   - POST /api/v1/auth/signup
 *   - POST /api/v1/auth/forgot-password
 *   - POST /api/v1/auth/logout
 *   - GET  /api/v1/users/me
 */

import { ROLE_PROFILES } from '../data/mockData';

// Centralized Mock Users Directory
export const MOCK_USERS = [
  {
    ...ROLE_PROFILES.superadmin,
    email: 'superadmin@demo.local',
    phone: '+966500000001',
    password: 'Demo@SuperAdmin123'
  },
  {
    ...ROLE_PROFILES.admin,
    email: 'admin@demo.local',
    phone: '+966500000004',
    password: 'Demo@Admin123'
  },
  {
    ...ROLE_PROFILES.manager,
    email: 'manager@demo.local',
    phone: '+966500000002',
    password: 'Demo@Manager123'
  },
  {
    ...ROLE_PROFILES.seller,
    email: 'seller@demo.local',
    phone: '+966500000003',
    password: 'Demo@Seller123'
  }
];

const AUTH_STORAGE_KEY = 'green_skill_auth_user';
const TOKEN_STORAGE_KEY = 'green_skill_auth_token';

class AuthService {
  /**
   * Helper to retrieve currently stored session user
   */
  getCurrentUser() {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY) || sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse auth user session:', e);
    }
    return null;
  }

  /**
   * Helper to check if session is active
   */
  isAuthenticated() {
    return !!this.getCurrentUser();
  }

  /**
   * Login with Email and Password
   */
  async loginWithEmail(email, password, rememberMe = false) {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const formattedEmail = (email || '').trim().toLowerCase();
    const userMatch = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === formattedEmail && u.password === password
    );

    if (!userMatch) {
      throw new Error('Invalid email or password. Please check your credentials.');
    }

    const sessionUser = {
      id: userMatch.id,
      name: userMatch.name,
      email: userMatch.email,
      phone: userMatch.phone,
      address: userMatch.address,
      role: userMatch.role,
      roleKey: userMatch.roleKey,
      accountStatus: userMatch.accountStatus,
      avatar: userMatch.avatar,
      permissions: userMatch.permissions
    };

    const mockJwtToken = `mock-jwt-token-${userMatch.roleKey}-${Date.now()}`;

    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));
    storage.setItem(TOKEN_STORAGE_KEY, mockJwtToken);

    return { user: sessionUser, token: mockJwtToken };
  }

  /**
   * Google OAuth 2.0 Integration Point Stub
   */
  async loginWithGoogle() {
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Default to Operational Manager for Google OAuth Demo stub
    const googleUser = {
      ...ROLE_PROFILES.manager,
      email: 'google.user@greenskillagro.sa',
      phone: '+966 50 777 8888',
      name: 'Google Auth User'
    };

    const mockToken = `mock-google-oauth-token-${Date.now()}`;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(googleUser));
    localStorage.setItem(TOKEN_STORAGE_KEY, mockToken);

    return { user: googleUser, token: mockToken };
  }

  /**
   * Signup / New User Registration
   */
  async signup(userData) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const newUser = {
      id: `USR-${Math.floor(100 + Math.random() * 900)}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address || 'Riyadh, Kingdom of Saudi Arabia',
      role: 'Field Sales Representative',
      roleKey: 'seller',
      accountStatus: 'Active (Pending Approval)',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=0D9488&color=fff&size=250`,
      permissions: [
        'POS Terminal Access',
        'Van Inventory Stock View',
        'Store Portfolio Access',
        'Cash Handover Submission',
        'Daily Attendance Check-In'
      ]
    };

    const mockToken = `mock-signup-token-${Date.now()}`;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    localStorage.setItem(TOKEN_STORAGE_KEY, mockToken);

    return { user: newUser, token: mockToken };
  }

  /**
   * Reset Password Request
   */
  async resetPassword(email) {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return { success: true, message: `Password reset link sent to ${email}` };
  }

  /**
   * Update Profile Photo
   */
  async updateProfilePhoto(photoUrl) {
    const user = this.getCurrentUser();
    if (user) {
      user.avatar = photoUrl;
      const storage = localStorage.getItem(AUTH_STORAGE_KEY) ? localStorage : sessionStorage;
      storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    }
    return user;
  }

  /**
   * Logout User
   */
  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}

export const authService = new AuthService();
