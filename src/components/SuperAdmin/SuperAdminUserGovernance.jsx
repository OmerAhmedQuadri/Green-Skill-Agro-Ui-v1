import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  ShieldCheck, 
  Crown, 
  User, 
  Building2, 
  Lock, 
  Unlock 
} from 'lucide-react';
import { useManagerContext } from '../../context/ManagerContext';
import { useLanguage } from '../../context/LanguageContext';

export const SuperAdminUserGovernance = ({ onOpenCreateAdmin, onShowToast }) => {
  const { userPermissions = [], updateUserRole, updateUserStatus } = useManagerContext();
  const { language, t } = useLanguage();

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [branchFilter, setBranchFilter] = useState('ALL');

  const filteredUsers = (userPermissions || []).filter(u => {
    const userId = u.userId || u.id || '';
    const userName = u.userName || u.name || '';
    const email = u.email || `${userName.toLowerCase().replace(/\s+/g, '.')}@greenskillagro.sa`;
    const location = u.assignedLocation || u.branchId || 'Enterprise';

    const matchesSearch = userName.toLowerCase().includes(search.toLowerCase()) || 
                          email.toLowerCase().includes(search.toLowerCase()) ||
                          userId.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesBranch = branchFilter === 'ALL' || location.toLowerCase().includes(branchFilter.toLowerCase());
    return matchesSearch && matchesRole && matchesBranch;
  });

  const handleRoleChange = async (user, newRole) => {
    const userId = user.userId || user.id;
    const name = user.userName || user.name;
    if (user.role === 'Super Admin') {
      alert(language === 'ar' ? 'لا يمكن تعديل دور المشرف العام.' : 'Super Admin role cannot be modified.');
      return;
    }
    await updateUserRole(userId, newRole);
    onShowToast(language === 'ar' ? `تم تحديث دور ${name} إلى ${newRole}.` : `Updated role for ${name} to ${newRole}.`);
  };

  const handleToggleStatus = async (user) => {
    const userId = user.userId || user.id;
    const name = user.userName || user.name;
    if (user.role === 'Super Admin') {
      alert(language === 'ar' ? 'لا يمكن تجميد حساب المشرف العام.' : 'Super Admin account cannot be suspended.');
      return;
    }
    const currentStatus = user.status || 'Active';
    const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    await updateUserStatus(userId, newStatus);
    onShowToast(language === 'ar' ? `تم تغيير حالة حساب ${name} إلى ${newStatus}.` : `${name}'s account status set to ${newStatus}.`);
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'Super Admin':
        return <span className="badge badge-success" style={{ backgroundColor: '#1b4332', color: '#fff' }}><Crown size={11} /> {t('superadminRole')}</span>;
      case 'Admin':
        return <span className="badge badge-success"><ShieldCheck size={11} /> Admin</span>;
      case 'Manager':
        return <span className="badge badge-info"><Building2 size={11} /> Manager</span>;
      case 'Seller':
        return <span className="badge badge-warning" style={{ backgroundColor: '#e2e8f0', color: '#334155' }}><User size={11} /> Seller</span>;
      default:
        return <span className="badge">{role}</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Bar */}
      <div className="panel-card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--color-forest-dark)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={18} className="text-emerald-800" />
              <span>{t('userDirectoryTitle')}</span>
            </h3>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {t('userDirectoryDesc')}
            </div>
          </div>
          <button className="btn-primary" style={{ backgroundColor: '#1b4332', borderColor: '#1b4332' }} onClick={onOpenCreateAdmin}>
            <UserPlus size={14} />
            <span>{t('provisionAdmin')}</span>
          </button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="header-search" style={{ width: '280px', margin: 0 }}>
            <Search size={14} className="search-icon-pos" />
            <input 
              type="text" 
              placeholder={t('searchUsersPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Filter size={14} style={{ color: 'var(--text-muted)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600 }}>{t('filterRole')}</span>
            <select 
              className="form-select" 
              style={{ width: '150px', padding: '6px 10px', fontSize: '12px' }}
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="ALL">{language === 'ar' ? 'جميع الأدوار' : 'All Roles'}</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Seller">Seller</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600 }}>{t('hubScope')}</span>
            <select 
              className="form-select" 
              style={{ width: '160px', padding: '6px 10px', fontSize: '12px' }}
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
            >
              <option value="ALL">{language === 'ar' ? 'جميع الفروع والنطاقات' : 'All Hubs & Scopes'}</option>
              <option value="Riyadh">{language === 'ar' ? 'الرياض (WH-01)' : 'Riyadh (WH-01)'}</option>
              <option value="Jeddah">{language === 'ar' ? 'جدة' : 'Jeddah'}</option>
              <option value="Dammam">{language === 'ar' ? 'الدمام' : 'Dammam'}</option>
              <option value="Enterprise">{language === 'ar' ? 'المنشأة' : 'Enterprise'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="panel-card" style={{ padding: '0', overflow: 'hidden' }}>
        <table className="erp-table" style={{ width: '100%', tableLayout: 'auto' }}>
          <thead>
            <tr>
              <th style={{ width: '105px', whiteSpace: 'nowrap' }}>{t('userId')}</th>
              <th style={{ minWidth: '160px' }}>{t('userNameContact')}</th>
              <th style={{ width: '125px', whiteSpace: 'nowrap' }}>{t('roleHierarchy')}</th>
              <th style={{ width: '160px' }}>{t('assignedHubScope')}</th>
              <th style={{ width: '100px', textAlign: 'center' }}>{t('status')}</th>
              <th style={{ textAlign: 'right', width: '190px' }}>{t('governanceActions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => {
              const uId = user.userId || user.id;
              const uName = user.userName || user.name;
              const uEmail = user.email || `${uName.toLowerCase().replace(/\s+/g, '.')}@greenskillagro.sa`;
              const uLocation = user.assignedLocation || user.branchId || 'Enterprise';
              const uStatus = user.status || 'Active';

              return (
                <tr key={uId}>
                  <td style={{ fontWeight: 700, fontFamily: 'monospace', fontSize: '11.5px', whiteSpace: 'nowrap', width: '105px' }}>{uId}</td>
                  <td style={{ minWidth: '160px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{uName}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.3' }}>{uEmail}</div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', lineHeight: '1.3' }}>+966 50 000 0000</div>
                  </td>
                  <td style={{ width: '125px', whiteSpace: 'nowrap' }}>{getRoleBadge(user.role)}</td>
                  <td style={{ width: '160px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 500 }}>{uLocation}</span>
                  </td>
                  <td style={{ width: '100px', textAlign: 'center' }}>
                    <span 
                      className={`badge ${uStatus === 'Active' ? 'badge-success' : 'badge-danger'}`}
                      style={{ minWidth: '76px', justifyContent: 'center', textAlign: 'center', display: 'inline-flex' }}
                    >
                      {uStatus === 'Active' ? t('active') : uStatus}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', width: '190px' }}>
                    {user.role === 'Super Admin' ? (
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic' }}>{t('rootAuthority')}</span>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', alignItems: 'center' }}>
                        <select
                          className="form-select"
                          style={{ padding: '3px 6px', fontSize: '11px', width: '95px', flexShrink: 0 }}
                          value={user.role}
                          onChange={(e) => handleRoleChange(user, e.target.value)}
                        >
                          <option value="Admin">Admin</option>
                          <option value="Manager">Manager</option>
                          <option value="Seller">Seller</option>
                        </select>

                        <button 
                          className={uStatus === 'Active' ? 'btn-secondary' : 'btn-primary'}
                          style={{ padding: '3px 8px', fontSize: '11px', minWidth: '80px', justifyContent: 'center', flexShrink: 0 }}
                          onClick={() => handleToggleStatus(user)}
                          title={uStatus === 'Active' ? 'Suspend Account' : 'Reactivate Account'}
                        >
                          {uStatus === 'Active' ? <Lock size={11} /> : <Unlock size={11} />}
                          <span>{uStatus === 'Active' ? t('suspend') : t('activate')}</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
