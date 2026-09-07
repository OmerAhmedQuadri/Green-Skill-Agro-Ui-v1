import React from 'react';
import { 
  GitMerge, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Crown, 
  Building2, 
  User 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const SuperAdminPermissionsMatrix = () => {
  const { language, t } = useLanguage();

  const permissionsMatrixData = [
    {
      category: language === 'ar' ? 'حوكمة المنشأة والنظام' : 'Enterprise & System Governance',
      permissions: [
        { name: language === 'ar' ? 'تفعيل زر الطوارئ' : 'Emergency Kill-Switch Activation', superAdmin: true, admin: false, manager: false, seller: false, note: language === 'ar' ? 'التحكم بالسلامة العامة' : 'Platform safety control' },
        { name: language === 'ar' ? 'إضافة وتعديل حسابات الأدمن' : 'Provision & Modify Admin Accounts', superAdmin: true, admin: false, manager: false, seller: false, note: language === 'ar' ? 'إنشاء أدوار الأدمن' : 'Admin role creation' },
        { name: language === 'ar' ? 'سجل تتبع المراجعة العامة' : 'Enterprise Master Audit Logs', superAdmin: true, admin: true, manager: false, seller: false, note: language === 'ar' ? 'الرقابة العامة' : 'Enterprise oversight' },
        { name: language === 'ar' ? 'إدارة المستودع المركزي' : 'Central Warehouse Management', superAdmin: true, admin: true, manager: false, seller: false, note: language === 'ar' ? 'التحكم التشغيلي' : 'Operational controls' },
      ]
    },
    {
      category: language === 'ar' ? 'قواعد وسقوف النظام' : 'System Rules & Ceilings',
      permissions: [
        { name: language === 'ar' ? 'تعديل سقوف النظام (نقدية، ائتمان، أوامر شراء)' : 'Modify System Ceilings (Cash, Credit, PO)', superAdmin: true, admin: true, manager: false, seller: false, note: language === 'ar' ? 'سقوف إدارية' : 'Admin ceiling control' },
        { name: language === 'ar' ? 'تهيئة الكتالوج الرئيسي للموردين' : 'Configure Vendor Master Catalog', superAdmin: true, admin: true, manager: false, seller: false, note: language === 'ar' ? 'قوالب الأصناف' : 'Template catalog' },
        { name: language === 'ar' ? 'شروط الإرجاع ومفاتيح الميزات' : 'Return Policy & Feature Toggles', superAdmin: true, admin: true, manager: false, seller: false, note: language === 'ar' ? 'مفاتيح الميزات' : 'Feature flag control' },
      ]
    },
    {
      category: language === 'ar' ? 'اعتمادات الشراء والمخزون' : 'Purchasing & Inventory Approvals',
      permissions: [
        { name: language === 'ar' ? 'اعتماد أوامر الشراء الكبيرة (>50,000 ريال)' : 'Approve High-Value Purchase Orders (>50k SAR)', superAdmin: true, admin: true, manager: false, seller: false, note: language === 'ar' ? 'اعتماد الشراء' : 'Admin PO approval' },
        { name: language === 'ar' ? 'إنشاء مسودة أمر شراء وإعداد الأصناف' : 'Raise Draft PO & SKU Setup', superAdmin: true, admin: true, manager: true, seller: false, note: 'Workflow A / C' },
        { name: language === 'ar' ? 'اعتماد إسقاط المخزون والصرف المباشر' : 'Approve Stock Write-Offs & Dispatches', superAdmin: true, admin: true, manager: true, seller: false, note: language === 'ar' ? 'عمليات المدير' : 'Manager operation' },
        { name: language === 'ar' ? 'منح تجاوز حظر ائتمان المتاجر' : 'Grant Store Credit Block Overrides', superAdmin: true, admin: true, manager: true, seller: false, note: language === 'ar' ? 'تجاوز الائتمان' : 'Credit override' },
      ]
    },
    {
      category: language === 'ar' ? 'العمليات الميدانية ومبيعات الشاحنات' : 'Field Operations & Van Sales',
      permissions: [
        { name: language === 'ar' ? 'صرف وجرد مخزون الشاحنة' : 'Issue Van Stock Loadout & Auditing', superAdmin: true, admin: true, manager: true, seller: false, note: 'Workflow F & N' },
        { name: language === 'ar' ? 'مراجعة وتأكيد تسليم نقدية المندوب' : 'Verify Seller Cash Handovers', superAdmin: true, admin: true, manager: true, seller: false, note: language === 'ar' ? 'تأكيد النقدية' : 'Cash verification' },
        { name: language === 'ar' ? 'إجراء مبيعات ميدانية وإصدار سندات التسليم' : 'Conduct Field Sales & Issue Delivery Docs', superAdmin: false, admin: false, manager: false, seller: true, note: language === 'ar' ? 'تنفيذ المندوب' : 'Seller execution' },
        { name: language === 'ar' ? 'تسجيل حضور الوردية والموقع الجغرافي' : 'Log Seller Attendance & GPS Check-In', superAdmin: false, admin: false, manager: false, seller: true, note: language === 'ar' ? 'حضور ميداني' : 'Field check-in' },
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Visual Role Hierarchy Header */}
      <div className="panel-card" style={{ padding: '20px', backgroundColor: '#1b4332', color: '#ffffff' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GitMerge size={20} style={{ color: '#4ade80' }} />
          <span>{t('platformRoleHierarchy')}</span>
        </h3>
        <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.8)', marginTop: '4px', marginBottom: '16px' }}>
          {t('strictDelegation')}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '6px', borderLeft: language === 'ar' ? 'none' : '4px solid #4ade80', borderRight: language === 'ar' ? '4px solid #4ade80' : 'none' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#4ade80', fontWeight: 700 }}>Tier 1 &bull; Executive</div>
            <div style={{ fontSize: '14px', fontWeight: 800, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Crown size={14} /> Super Admin
            </div>
            <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '4px' }}>{language === 'ar' ? 'رقابة عامة كاملة، أزرار الطوارئ، وتدشين حسابات الأدمن.' : 'Complete platform oversight, kill-switches, & admin creation.'}</div>
          </div>

          <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '6px', borderLeft: language === 'ar' ? 'none' : '4px solid #93c5fd', borderRight: language === 'ar' ? '4px solid #93c5fd' : 'none' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#93c5fd', fontWeight: 700 }}>Tier 2 &bull; Governance</div>
            <div style={{ fontSize: '14px', fontWeight: 800, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} /> Admin Desk
            </div>
            <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '4px' }}>{language === 'ar' ? 'سقوف النظام، اعتمادات أوامر الشراء، قوالب المنتجات، وضوابط الموردين.' : 'System ceilings, PO approvals, catalog templates, & vendor rules.'}</div>
          </div>

          <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '6px', borderLeft: language === 'ar' ? 'none' : '4px solid #fde047', borderRight: language === 'ar' ? '4px solid #fde047' : 'none' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#fde047', fontWeight: 700 }}>Tier 3 &bull; Operations</div>
            <div style={{ fontSize: '14px', fontWeight: 800, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Building2 size={14} /> Manager Control
            </div>
            <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '4px' }}>{language === 'ar' ? 'عمليات المستودع، الإسقاط، الصرف المباشر، وصرف الشاحنات وتجاوزات الائتمان.' : 'Warehouse queue, write-offs, dispatches, loadout, & credit override.'}</div>
          </div>

          <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '6px', borderLeft: language === 'ar' ? 'none' : '4px solid #cbd5e1', borderRight: language === 'ar' ? '4px solid #cbd5e1' : 'none' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#cbd5e1', fontWeight: 700 }}>Tier 4 &bull; Execution</div>
            <div style={{ fontSize: '14px', fontWeight: 800, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <User size={14} /> Field Seller
            </div>
            <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '4px' }}>{language === 'ar' ? 'مبيعات الشاحنات، إصدار سندات التسليم، تسليم النقدية، وتفقُّد المتاجر.' : 'Van sales, delivery issuance, cash handover, & store visits.'}</div>
          </div>
        </div>
      </div>

      {/* Permissions Matrix Table */}
      <div className="panel-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', backgroundColor: '#fafcf9' }}>
          <h3 style={{ margin: 0, fontSize: '15px', color: 'var(--color-forest-dark)', fontWeight: 700 }}>
            {t('functionalCapabilityMatrix')}
          </h3>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
            {t('functionalMatrixDesc')}
          </div>
        </div>

        <table className="erp-table">
          <thead>
            <tr>
              <th style={{ width: '35%' }}>{language === 'ar' ? 'مجموعة الصلاحيات والإمكانيات' : 'Functional Permission Set'}</th>
              <th style={{ width: '15%', textAlign: 'center' }}>Super Admin</th>
              <th style={{ width: '15%', textAlign: 'center' }}>Admin</th>
              <th style={{ width: '15%', textAlign: 'center' }}>Manager</th>
              <th style={{ width: '15%', textAlign: 'center' }}>Seller</th>
            </tr>
          </thead>
          <tbody>
            {permissionsMatrixData.map((cat, idx) => (
              <React.Fragment key={idx}>
                <tr style={{ backgroundColor: '#f4f6f3' }}>
                  <td colSpan={5} style={{ fontWeight: 700, fontSize: '12px', color: '#1b4332', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {cat.category}
                  </td>
                </tr>
                {cat.permissions.map((p, pIdx) => (
                  <tr key={pIdx}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{p.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{p.note}</div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {p.superAdmin ? <CheckCircle2 size={16} className="text-emerald-700" style={{ display: 'inline' }} /> : <XCircle size={16} style={{ color: '#cbd5e1', display: 'inline' }} />}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {p.admin ? <CheckCircle2 size={16} className="text-emerald-700" style={{ display: 'inline' }} /> : <XCircle size={16} style={{ color: '#cbd5e1', display: 'inline' }} />}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {p.manager ? <CheckCircle2 size={16} className="text-emerald-700" style={{ display: 'inline' }} /> : <XCircle size={16} style={{ color: '#cbd5e1', display: 'inline' }} />}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {p.seller ? <CheckCircle2 size={16} className="text-emerald-700" style={{ display: 'inline' }} /> : <XCircle size={16} style={{ color: '#cbd5e1', display: 'inline' }} />}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
