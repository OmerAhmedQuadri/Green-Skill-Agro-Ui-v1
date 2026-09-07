import React from 'react';
import { Search, Building2, ChevronDown, ArrowRightLeft, Menu, Globe } from 'lucide-react';
import { SYSTEM_INFO } from '../data/mockData';
import { Logo } from './Logo';
import { useLanguage } from '../context/LanguageContext';

export const Header = ({ onSearch, searchQuery, currentRole = 'manager', onSwitchRole, onOpenDrawer }) => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="erp-header">
      <div className="header-brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          className="drawer-toggle-btn"
          style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', padding: '4px', marginRight: '2px' }}
          onClick={onOpenDrawer}
          title="Open Navigation Menu"
        >
          <Menu size={22} />
        </button>

        <Logo height={28} />

        <div className="warehouse-tag" style={{ marginLeft: '4px' }}>
          <Building2 size={14} className="text-white/70" />
          <span>{t('warehouseName')}</span>
          <span className="live-dot" title={t('liveServer')}></span>
        </div>
      </div>

      <div className="header-right">
        <div className="header-search">
          <Search size={14} className="search-icon-pos" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Language Switcher Button */}
        <button
          onClick={toggleLanguage}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            padding: '4px 10px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            whiteSpace: 'nowrap'
          }}
          title={language === 'en' ? 'Switch to Saudi Arabic (RTL)' : 'التغيير إلى الإنجليزية'}
        >
          <Globe size={14} style={{ color: '#4ade80' }} />
          <span>{t('langName')}</span>
        </button>

        {/* Multi-role Switcher Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ArrowRightLeft size={13} style={{ color: 'rgba(255,255,255,0.7)' }} />
          <select
            className="form-select role-switcher-select"
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.15)', 
              borderColor: 'rgba(255,255,255,0.3)', 
              color: '#ffffff', 
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px'
            }}
            value={currentRole}
            onChange={(e) => onSwitchRole(e.target.value)}
          >
            <option value="superadmin" style={{ color: '#000' }}>{t('superadminRole')}</option>
            <option value="admin" style={{ color: '#000' }}>{t('adminRole')}</option>
            <option value="manager" style={{ color: '#000' }}>{t('managerRole')}</option>
            <option value="seller" style={{ color: '#000' }}>{t('sellerRole')}</option>
          </select>
        </div>

        <div className="user-profile-badge">
          <div className="avatar-initials">
            {currentRole === 'superadmin' ? 'SU' : (currentRole === 'admin' ? 'AD' : (currentRole === 'manager' ? 'SA' : 'OF'))}
          </div>
          <div className="user-info">
            <span className="user-name">
              {currentRole === 'superadmin' ? (language === 'ar' ? 'عبدالعزيز آل سعود' : 'Abdulaziz Al-Saud') : (currentRole === 'admin' ? (language === 'ar' ? 'مدير النظام' : 'Admin System Owner') : (currentRole === 'manager' ? (language === 'ar' ? 'سامي المنصور' : SYSTEM_INFO.currentUser.name) : (language === 'ar' ? 'عمر فاروق' : 'Omar Farooq')))}
            </span>
            <span className="user-role">
              {currentRole === 'superadmin' ? t('superadminTitle') : (currentRole === 'admin' ? t('adminTitle') : (currentRole === 'manager' ? t('managerTitle') : t('sellerTitle')))}
            </span>
          </div>
          <ChevronDown size={14} className="text-white/60" />
        </div>
      </div>
    </header>
  );
};
