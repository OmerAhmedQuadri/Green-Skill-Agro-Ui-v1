import React from 'react';
import { 
  Building2, 
  Users, 
  Crown, 
  ShieldAlert, 
  CheckCircle2, 
  TrendingUp, 
  ArrowUpRight, 
  UserPlus 
} from 'lucide-react';
import { useManagerContext } from '../../context/ManagerContext';
import { useLanguage } from '../../context/LanguageContext';

export const SuperAdminOverview = ({ onOpenCreateAdmin, onNavigateTab }) => {
  const { language, t } = useLanguage();
  const { userPermissions = [], killSwitches = [] } = useManagerContext();

  const totalUsers = (userPermissions || []).length;
  const adminUsers = (userPermissions || []).filter(u => u.role === 'Admin');
  const activeKillSwitchesCount = (killSwitches || []).filter(k => k.active || k.enabled).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Metric Cards */}
      <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">{language === 'ar' ? 'مستودعات المنشأة' : 'Enterprise Warehouses'}</span>
            <Building2 size={16} className="metric-icon text-emerald-800" />
          </div>
          <div className="metric-value">{language === 'ar' ? '4 مراكز' : '4 Hubs'}</div>
          <div className="metric-subtitle">
            <span className="text-emerald-700 font-semibold" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <CheckCircle2 size={12} style={{ marginRight: '3px' }} /> {language === 'ar' ? '100% تعمل بطاقتها' : '100% Operational'}
            </span>
            <span> &bull; {language === 'ar' ? 'عبر المملكة' : 'Kingdom-wide'}</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">{language === 'ar' ? 'إجمالي مستخدمي المنصة' : 'Total Platform Users'}</span>
            <Users size={16} className="metric-icon text-emerald-800" />
          </div>
          <div className="metric-value">{totalUsers} {language === 'ar' ? 'مستخدمين' : 'Users'}</div>
          <div className="metric-subtitle">
            <span>{language === 'ar' ? '4 أدوار عبر 4 فروع إقليمية' : '4 Roles across 4 Regional Branches'}</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">{language === 'ar' ? 'مدراء النظام النشطون' : 'Active System Admins'}</span>
            <Crown size={16} className="metric-icon text-emerald-800" />
          </div>
          <div className="metric-value">{adminUsers.length} {language === 'ar' ? 'مسؤولين' : 'Admins'}</div>
          <div className="metric-subtitle">
            <span className="text-emerald-800 font-semibold">{language === 'ar' ? '1 مشرف عام' : '1 Super Admin'}</span>
            <span> &bull; {language === 'ar' ? 'تحكم رئيسي' : 'Master Controls'}</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">{language === 'ar' ? 'الأمان وأزرار الطوارئ' : 'Security & Kill-Switches'}</span>
            <ShieldAlert size={16} className={`metric-icon ${activeKillSwitchesCount > 0 ? 'text-amber-700' : 'text-emerald-800'}`} />
          </div>
          <div className="metric-value">{activeKillSwitchesCount} {language === 'ar' ? 'نشط' : 'Active'}</div>
          <div className="metric-subtitle">
            {activeKillSwitchesCount > 0 ? (
              <span className="text-amber-800 font-semibold">{language === 'ar' ? 'أقفال الطوارئ مفعلة' : 'Emergency Locks Enabled'}</span>
            ) : (
              <span className="text-emerald-700 font-semibold">{language === 'ar' ? 'جميع الأنظمة طبيعية' : 'All Systems Normal'}</span>
            )}
          </div>
        </div>
      </div>

      {/* Action Banner */}
      <div 
        className="superadmin-banner-card"
        style={{
          backgroundColor: '#1b4332',
          color: '#ffffff',
          padding: '20px 24px',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}
      >
        <div style={{ flex: '1 1 300px', minWidth: 0 }}>
          <div style={{ fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Crown size={20} style={{ color: '#4ade80', flexShrink: 0 }} />
            <span>{language === 'ar' ? 'رقابة عمليات المنشأة — المرحلة الأولى' : 'Phase 1 Enterprise Operations Oversight'}</span>
          </div>
          <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.8)', marginTop: '4px', lineHeight: 1.4 }}>
            {language === 'ar' ? 'حوكمة المستودع المركزي الرئيسي مفعلة. أنت تعرض المقاييس المباشرة لمركز التوزيع المركزي بالرياض (WH-01).' : 'Single central warehouse governance active. You are viewing live metrics for Riyadh Central Distribution Center (WH-01).'}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexShrink: 0, flexWrap: 'wrap' }}>
          <button 
            className="btn-primary" 
            style={{ backgroundColor: '#ffffff', color: '#1b4332', borderColor: '#ffffff', fontWeight: 700, whiteSpace: 'nowrap' }}
            onClick={onOpenCreateAdmin}
          >
            <UserPlus size={14} />
            <span>{language === 'ar' ? '+ تعيين أدمن جديد' : '+ Provision Admin'}</span>
          </button>
          <button 
            className="btn-secondary" 
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}
            onClick={() => onNavigateTab('superadmin-security')}
          >
            <ShieldAlert size={14} />
            <span>{language === 'ar' ? 'لوحة أزرار الطوارئ' : 'Kill-Switches Panel'}</span>
          </button>
        </div>
      </div>

      {/* Central Warehouse Overview (Phase 1 Single DC) */}
      <div className="panel-card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', color: 'var(--color-forest-dark)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={18} className="text-emerald-800" />
              <span>{language === 'ar' ? 'نظرة عامة على المستودع المركزي — المرحلة الأولى' : 'Phase 1 Central Warehouse Overview'}</span>
            </h3>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {language === 'ar' ? 'مقاييس التشغيل المباشرة لمركز التوزيع الرئيسي (WH-01).' : 'Live operational metrics for the primary distribution hub (WH-01).'}
            </div>
          </div>
          <button className="btn-secondary" onClick={() => onNavigateTab('superadmin-branches')}>
            <span>{language === 'ar' ? 'عرض أدوات تحكم المستودع' : 'View Warehouse Controls'}</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        <div style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '18px', backgroundColor: '#fafcf9' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--color-forest-dark)' }}>
                {language === 'ar' ? 'مركز التوزيع المركزي بالرياض (WH-01)' : 'Riyadh Central Distribution Center (WH-01)'}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                {language === 'ar' ? 'المنطقة المركزية (الرياض)، المملكة العربية السعودية' : 'Central Region (Riyadh), Kingdom of Saudi Arabia'}
              </div>
            </div>
            <span className="badge badge-success" style={{ fontSize: '11.5px', padding: '4px 10px' }}>
              {language === 'ar' ? 'مستودع مركزي نشط' : 'Active Central Hub'}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', fontSize: '12px', marginTop: '14px', borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '11px', fontWeight: 600 }}>{language === 'ar' ? 'مدير المستودع' : 'Warehouse Manager'}</div>
              <div style={{ fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>{language === 'ar' ? 'سامي المنصور' : 'Sami Al-Mansoor'}</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '11px', fontWeight: 600 }}>{language === 'ar' ? 'شاحنات المبيعات النشطة' : 'Active Field Vans'}</div>
              <div style={{ fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>{language === 'ar' ? '4 شاحنات مبيعات مخصصة' : '4 Sales Vans Assigned'}</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '11px', fontWeight: 600 }}>{language === 'ar' ? 'تقييم المخزون' : 'Inventory Valuation'}</div>
              <div style={{ fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>{language === 'ar' ? '1,420,000 ريال' : 'SAR 1,420,000'}</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '11px', fontWeight: 600 }}>{language === 'ar' ? 'هدف الإيراد اليومي' : 'Daily Target Revenue'}</div>
              <div style={{ fontWeight: 700, color: '#1b4332', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={14} className="text-emerald-700" />
                {language === 'ar' ? '150,000 ريال / يومياً' : 'SAR 150,000 / day'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
