import React from 'react';
import { Search, Building2, Menu, Globe, LogOut, User } from 'lucide-react';
import { Logo } from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const Header = ({ onSearch, searchQuery, onOpenDrawer, onNavigateProfile }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { currentUser, logout } = useAuth();

  const activeUser = currentUser || {
    name: 'User',
    role: 'Staff',
    roleKey: 'manager'
  };

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

        {/* User Profile Badge */}
        <div 
          className="user-profile-badge cursor-pointer hover:bg-white/20 transition-colors"
          onClick={() => onNavigateProfile && onNavigateProfile()}
          title={t('myProfile')}
          style={{ cursor: 'pointer' }}
        >
          <div className="avatar-initials">
            {activeUser.name ? activeUser.name.substring(0, 2).toUpperCase() : 'US'}
          </div>
          <div className="user-info">
            <span className="user-name">
              {activeUser.name}
            </span>
            <span className="user-role">
              {activeUser.role}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(248, 113, 113, 0.4)',
            color: '#ffffff',
            fontSize: '11.5px',
            fontWeight: 700,
            cursor: 'pointer',
            padding: '5px 10px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            whiteSpace: 'nowrap'
          }}
          title={t('logoutBtn')}
        >
          <LogOut size={13} style={{ color: '#f87171' }} />
          <span>{t('logoutBtn')}</span>
        </button>
      </div>
    </header>
  );
};
