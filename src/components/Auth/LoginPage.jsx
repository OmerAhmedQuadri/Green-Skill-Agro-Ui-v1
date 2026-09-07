import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Logo } from '../Logo';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Globe, 
  ShieldCheck, 
  AlertCircle,
  Sparkles,
  ChevronRight,
  UserCheck
} from 'lucide-react';

export function LoginPage() {
  const { loginWithEmail, loginWithGoogle, setAuthView, authError, setAuthError, loginAsDemoUser } = useAuth();
  const { language, toggleLanguage, t, isRtl } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginWithEmail(email, password, rememberMe);
    } catch (err) {
      // Error handled by AuthContext authError
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      // Error handled
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async (roleKey) => {
    setLoading(true);
    try {
      await loginAsDemoUser(roleKey);
    } catch (err) {
      // Error handled
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Top Navbar / Language Switcher */}
      <header className="auth-topbar">
        <Logo height={32} />
        <button 
          onClick={toggleLanguage}
          className="auth-lang-btn"
          title={language === 'en' ? 'Switch to Saudi Arabic' : 'التغيير إلى الإنجليزية'}
        >
          <Globe size={15} className="text-emerald-400" />
          <span>{t('langName')}</span>
        </button>
      </header>

      {/* Main Auth Card Container */}
      <main className="auth-main-wrapper">
        <div className="auth-card">
          {/* Card Header */}
          <div className="auth-card-header">
            <h1 className="auth-card-title">{t('loginTitle')}</h1>
            <p className="auth-card-subtitle">{t('loginSubtitle')}</p>
          </div>

          {/* Quick Demo Credentials Selector Pill Bar */}
          <div className="auth-demo-bar">
            <span className="auth-demo-label">{t('demoQuickLogin')}</span>
            <div className="auth-demo-pills">
              <button 
                type="button" 
                onClick={() => handleQuickDemo('superadmin')} 
                className="demo-pill pill-superadmin"
                disabled={loading}
              >
                {t('superadminDemo')}
              </button>
              <button 
                type="button" 
                onClick={() => handleQuickDemo('admin')} 
                className="demo-pill pill-admin"
                disabled={loading}
              >
                {t('adminDemo')}
              </button>
              <button 
                type="button" 
                onClick={() => handleQuickDemo('manager')} 
                className="demo-pill pill-manager"
                disabled={loading}
              >
                {t('managerDemo')}
              </button>
              <button 
                type="button" 
                onClick={() => handleQuickDemo('seller')} 
                className="demo-pill pill-seller"
                disabled={loading}
              >
                {t('sellerDemo')}
              </button>
            </div>
          </div>

          {/* Auth Error Alert */}
          {authError && (
            <div className="auth-error-alert">
              <AlertCircle size={16} className="shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Email Field */}
            <div className="auth-form-group">
              <label className="auth-label">{t('emailLabel')}</label>
              <div className="auth-input-wrapper">
                <Mail size={16} className="auth-input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setAuthError(''); setEmail(e.target.value); }}
                  required
                  placeholder="name@domain.sa"
                  className="auth-input"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="auth-form-group">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <label className="auth-label" style={{ marginBottom: 0 }}>{t('passwordLabel')}</label>
                <button
                  type="button"
                  onClick={() => setAuthView('forgot-password')}
                  className="auth-link-forgot"
                >
                  {t('forgotPasswordLink')}
                </button>
              </div>
              <div className="auth-input-wrapper">
                <Lock size={16} className="auth-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setAuthError(''); setPassword(e.target.value); }}
                  required
                  placeholder="••••••••"
                  className="auth-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-password-toggle"
                  title={showPassword ? t('hidePassword') : t('showPassword')}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="auth-remember-row">
              <label className="auth-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="auth-checkbox"
                />
                <span>{t('rememberMe')}</span>
              </label>
            </div>

            {/* Submit Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="auth-submit-btn"
            >
              <span>{loading ? 'Authenticating...' : t('loginBtn')}</span>
            </button>

            {/* OAuth Divider */}
            <div className="auth-divider">
              <span>OR</span>
            </div>

            {/* Google Login Integration Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="auth-google-btn"
            >
              <svg style={{ width: '18px', height: '18px', flexShrink: 0, margin: isRtl ? '0 0 0 8px' : '0 8px 0 0' }} viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{t('continueWithGoogle')}</span>
            </button>
          </form>

          {/* Footer Link to Signup */}
          <div className="auth-card-footer">
            <span>{t('noAccountPrompt')}</span>
            <button
              type="button"
              onClick={() => setAuthView('signup')}
              className="auth-footer-link"
            >
              {t('signUpHere')}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
