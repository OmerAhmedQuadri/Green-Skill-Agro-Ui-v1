import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Logo } from '../Logo';
import { 
  Mail, 
  ArrowLeft, 
  ArrowRight,
  Globe, 
  CheckCircle2,
  KeyRound,
  AlertCircle
} from 'lucide-react';

export function ForgotPasswordPage() {
  const { sendPasswordReset, setAuthView, authError } = useAuth();
  const { language, toggleLanguage, t, isRtl } = useLanguage();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordReset(email);
      setSubmitted(true);
    } catch (err) {
      // Error handled
    } finally {
      setLoading(false);
    }
  };

  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

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
          {submitted ? (
            /* Success State */
            <div className="auth-success-state">
              <div className="auth-success-icon-wrap">
                <CheckCircle2 size={40} className="text-emerald-600" />
              </div>
              <h2 className="auth-card-title">{t('resetEmailSentTitle')}</h2>
              <p className="auth-card-subtitle" style={{ marginTop: '8px' }}>
                {t('resetEmailSentBody')}
              </p>
              <div className="auth-submitted-email-chip">
                {email}
              </div>

              <button
                type="button"
                onClick={() => setAuthView('login')}
                className="auth-submit-btn"
                style={{ marginTop: '20px' }}
              >
                <BackIcon size={16} />
                <span>{t('backToLogin')}</span>
              </button>
            </div>
          ) : (
            /* Reset Form State */
            <>
              <div className="auth-card-header">
                <h1 className="auth-card-title">{t('forgotPasswordTitle')}</h1>
                <p className="auth-card-subtitle">{t('forgotPasswordSubtitle')}</p>
              </div>

              {authError && (
                <div className="auth-error-alert">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-form-group">
                  <label className="auth-label">{t('emailLabel')}</label>
                  <div className="auth-input-wrapper">
                    <Mail size={16} className="auth-input-icon" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="name@domain.sa"
                      className="auth-input"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="auth-submit-btn"
                >
                  <span>{loading ? 'Sending Instructions...' : t('sendResetLinkBtn')}</span>
                </button>
              </form>

              <div className="auth-card-footer">
                <button
                  type="button"
                  onClick={() => setAuthView('login')}
                  className="auth-footer-link"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <BackIcon size={14} />
                  <span>{t('backToLogin')}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
