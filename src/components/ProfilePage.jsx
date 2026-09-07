import React, { useState, useEffect, useRef } from 'react';
import { useManagerContext } from '../context/ManagerContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Shield, 
  Lock, 
  Camera, 
  RotateCcw, 
  CheckCircle2, 
  BadgeCheck,
  KeyRound,
  ShieldCheck,
  Save,
  Key,
  AlertTriangle
} from 'lucide-react';

export function ProfilePage({ currentRole = 'superadmin' }) {
  const { getUserProfile, updateProfilePhoto, updateUserProfile, resetUserPassword } = useManagerContext();
  const { t, isRtl } = useLanguage();
  
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [photoPreview, setPhotoPreview] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const fileInputRef = useRef(null);

  // Editable Profile Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Password Reset Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoadingProfile(true);
    getUserProfile(currentRole).then(data => {
      if (isMounted && data) {
        setProfile(data);
        setPhotoPreview(data.avatar || '');
        setFormData({
          name: data.name || '',
          phone: data.phone || '',
          address: data.address || ''
        });
        setLoadingProfile(false);
      }
    });
    return () => { isMounted = false; };
  }, [currentRole]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Photo = reader.result;
        setPhotoPreview(base64Photo);
        await updateProfilePhoto(currentRole, base64Photo);
        setProfile(prev => prev ? { ...prev, avatar: base64Photo } : prev);
        showToast(t('photoSuccessToast'));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = async () => {
    const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || profile?.name || 'User')}&background=0D9488&color=fff&size=250`;
    setPhotoPreview(defaultAvatar);
    await updateProfilePhoto(currentRole, defaultAvatar);
    setProfile(prev => prev ? { ...prev, avatar: defaultAvatar } : prev);
    showToast(t('photoRemovedToast'));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    await updateUserProfile(currentRole, {
      name: formData.name,
      phone: formData.phone,
      address: formData.address
    });
    setProfile(prev => prev ? { ...prev, ...formData } : prev);
    setIsSavingProfile(false);
    showToast(t('profileUpdatedSuccess'));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setPasswordError('');

    if (!passwordData.currentPassword) {
      setPasswordError(t('currentPasswordRequired'));
      return;
    }
    if (!passwordData.newPassword) {
      setPasswordError('Please enter a new password.');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError(t('passwordMismatchError'));
      return;
    }

    setIsResettingPassword(true);
    await resetUserPassword(currentRole, {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    });
    setIsResettingPassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    showToast(t('passwordResetSuccess'));
  };

  if (loadingProfile || !profile) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-forest-dark)' }}>
        <div style={{ fontSize: '13px', fontWeight: 600 }}>Loading User Profile...</div>
      </div>
    );
  }

  return (
    <div className="profile-page-container" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="toast-banner" style={{ backgroundColor: '#1b4332', color: '#ffffff', border: '1px solid #4ade80', padding: '10px 18px', borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 9999 }}>
          <CheckCircle2 size={18} style={{ color: '#4ade80' }} />
          <span style={{ fontSize: '12px', fontWeight: 700 }}>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="profile-header-banner">
        <div className="profile-header-info">
          <div className="profile-header-icon">
            <User size={28} />
          </div>
          <div>
            <div className="profile-header-title">
              <span>{t('myProfile')}</span>
              <span className="profile-header-role-tag">
                {profile.roleKey}
              </span>
            </div>
            <div className="profile-header-subtitle">{t('profileSubtitle')}</div>
          </div>
        </div>

        <div className="profile-status-badge">
          <ShieldCheck size={16} style={{ color: '#166534' }} />
          <span>{profile.accountStatus}</span>
        </div>
      </div>

      <div className="profile-layout-grid">
        {/* Left Column: Editable Profile Photo Card & Policy Alert */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="profile-card">
            <div className="profile-avatar-section">
              <div className="profile-avatar-container">
                <img
                  src={photoPreview || profile.avatar}
                  alt={formData.name || profile.name}
                  className="profile-avatar-img"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="profile-camera-badge"
                  title={t('changePhoto')}
                >
                  <Camera size={16} />
                </button>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoSelect}
                accept="image/*"
                style={{ display: 'none' }}
              />

              <div className="profile-user-name">{formData.name || profile.name}</div>
              <div className="profile-user-role-label">{profile.role}</div>
              <span className="profile-user-id-chip">
                ID: {profile.id}
              </span>

              {/* Action Buttons */}
              <div className="profile-photo-actions">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="profile-btn-upload"
                >
                  <Camera size={15} />
                  <span>{t('changePhoto')}</span>
                </button>

                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="profile-btn-remove"
                >
                  <RotateCcw size={14} />
                  <span>{t('removePhoto')}</span>
                </button>
              </div>

              <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '12px' }}>
                {t('uploadImagePreview')} &bull; JPG, PNG, WEBP
              </div>
            </div>
          </div>

          {/* Security Policy Alert */}
          <div className="profile-security-alert">
            <div className="profile-security-title">
              <Shield size={16} style={{ color: '#d97706' }} />
              <span>{t('securityNoticeTitle')}</span>
            </div>
            <div className="profile-security-body">
              {t('securityNoticeBody')}
            </div>
          </div>
        </div>

        {/* Right Columns: Personal Details (Editable), Password Reset & Role Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Card 1: Personal Information (Editable Name, Phone, Address) */}
          <form onSubmit={handleSaveProfile} className="profile-card">
            <div className="profile-card-header">
              <div className="profile-card-title">
                <div className="profile-card-icon-wrap">
                  <User size={16} />
                </div>
                <span>{t('personalInfo')}</span>
              </div>
            </div>

            <div className="profile-fields-grid">
              {/* Full Name (Editable) */}
              <div className="profile-form-group">
                <label className="profile-label">{t('fullName')}</label>
                <div className="profile-input-wrapper">
                  <User size={15} className="profile-input-icon" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="profile-input-field editable"
                    placeholder="Enter full name"
                  />
                </div>
              </div>

              {/* Phone Number (Editable) */}
              <div className="profile-form-group">
                <label className="profile-label">{t('phoneNumber')}</label>
                <div className="profile-input-wrapper">
                  <Phone size={15} className="profile-input-icon" />
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="profile-input-field editable"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              {/* Complete Address (Editable) */}
              <div className="profile-form-group">
                <label className="profile-label">{t('completeAddress')}</label>
                <div className="profile-input-wrapper">
                  <MapPin size={15} className="profile-input-icon" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    className="profile-input-field editable"
                    placeholder="Enter complete address"
                  />
                </div>
              </div>

              {/* Corporate Email (Read-Only) */}
              <div className="profile-form-group">
                <label className="profile-label">{t('corporateEmail')}</label>
                <div className="profile-input-wrapper">
                  <Mail size={15} className="profile-input-icon" />
                  <input
                    type="email"
                    value={profile.email}
                    readOnly
                    disabled
                    className="profile-input-field"
                  />
                  <Lock size={14} className="profile-lock-icon" />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                type="submit"
                disabled={isSavingProfile}
                className="profile-btn-save"
              >
                <span>{isSavingProfile ? 'Saving...' : t('saveProfileChanges')}</span>
              </button>
            </div>
          </form>

          {/* Card 2: Password Reset Section */}
          <form onSubmit={handleResetPassword} className="profile-card">
            <div className="profile-card-header">
              <div className="profile-card-title">
                <div className="profile-card-icon-wrap" style={{ backgroundColor: '#fef3c7', color: '#b45309' }}>
                  <Key size={16} />
                </div>
                <span>{t('resetPasswordSection')}</span>
              </div>
            </div>

            <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '-8px' }}>
              {t('resetPasswordDesc')}
            </p>

            {passwordError && (
              <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '8px 12px', borderRadius: '6px', fontSize: '11.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={14} />
                <span>{passwordError}</span>
              </div>
            )}

            <div className="profile-fields-grid">
              {/* Current Password */}
              <div className="profile-form-group">
                <label className="profile-label">{t('currentPassword')}</label>
                <div className="profile-input-wrapper">
                  <KeyRound size={15} className="profile-input-icon" />
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    required
                    className="profile-input-field editable"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {/* New Password */}
                <div className="profile-form-group">
                  <label className="profile-label">{t('newPassword')}</label>
                  <div className="profile-input-wrapper">
                    <Lock size={15} className="profile-input-icon" />
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      required
                      className="profile-input-field editable"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/* Confirm New Password */}
                <div className="profile-form-group">
                  <label className="profile-label">{t('confirmPassword')}</label>
                  <div className="profile-input-wrapper">
                    <ShieldCheck size={15} className="profile-input-icon" />
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      required
                      className="profile-input-field editable"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Reset Password Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                type="submit"
                disabled={isResettingPassword}
                className="profile-btn-save"
                style={{ backgroundColor: '#b45309' }}
              >
                <span>{isResettingPassword ? 'Updating...' : t('resetPasswordBtn')}</span>
              </button>
            </div>
          </form>

          {/* Card 3: Role Governance & Account Status */}
          <div className="profile-card">
            <div className="profile-card-header">
              <div className="profile-card-title">
                <div className="profile-card-icon-wrap">
                  <KeyRound size={16} />
                </div>
                <span>{t('roleInfo')}</span>
              </div>
              <span className="profile-readonly-tag">
                <Lock size={12} />
                {t('readOnlyNotice')}
              </span>
            </div>

            <div className="profile-governance-cards">
              <div className="profile-gov-box">
                <div>
                  <span className="profile-gov-label">{t('assignedRole')}</span>
                  <span className="profile-gov-value">{profile.role}</span>
                </div>
                <BadgeCheck size={22} style={{ color: 'var(--color-forest-dark)' }} />
              </div>

              <div className="profile-gov-box">
                <div>
                  <span className="profile-gov-label">{t('accountStatusLabel')}</span>
                  <span className="profile-gov-value" style={{ color: '#15803d' }}>{profile.accountStatus}</span>
                </div>
                <ShieldCheck size={22} style={{ color: '#15803d' }} />
              </div>
            </div>
          </div>

          {/* Card 4: Granted Permissions Card */}
          <div className="profile-card">
            <div className="profile-card-header">
              <div className="profile-card-title">
                <div className="profile-card-icon-wrap">
                  <ShieldCheck size={16} />
                </div>
                <span>{t('grantedPermissions')}</span>
              </div>
            </div>

            <div className="profile-permissions-grid">
              {profile.permissions?.map((perm, idx) => (
                <div key={idx} className="profile-permission-chip">
                  <CheckCircle2 size={15} style={{ color: '#166534', flexShrink: 0 }} />
                  <span>{perm}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
