import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  Unlock, 
  FileSpreadsheet, 
  Search 
} from 'lucide-react';
import { useManagerContext } from '../../context/ManagerContext';
import { useLanguage } from '../../context/LanguageContext';

export const SuperAdminSecurityAudit = ({ onShowToast }) => {
  const { killSwitches = [], toggleKillSwitch } = useManagerContext();
  const { language, t } = useLanguage();

  const [auditSearch, setAuditSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');

  const auditLogsData = [
    { id: 'AUD-901', timestamp: '2026-09-07 14:20:11', user: language === 'ar' ? 'عبدالعزيز آل سعود (المشرف العام)' : 'Abdulaziz Al-Saud (Super Admin)', action: language === 'ar' ? 'تغيير زر الطوارئ' : 'Kill-Switch Toggled', details: language === 'ar' ? 'التحقق من حالة قفل النقدية لمبيعات الجوال' : 'Mobile Sales Cash Lock verified normal state', risk: 'Sensitive' },
    { id: 'AUD-900', timestamp: '2026-09-07 13:45:00', user: language === 'ar' ? 'مالك النظام (أدمن)' : 'Admin System Owner', action: language === 'ar' ? 'تعديل سقف أمر الشراء' : 'PO Ceiling Modified', details: language === 'ar' ? 'رفع سقف أمر الشراء لمستودع القصيم WH-02 إلى 150,000 ريال' : 'Raised PO ceiling for Al-Qassim WH-02 to SAR 150,000', risk: 'Normal' },
    { id: 'AUD-899', timestamp: '2026-09-07 12:15:32', user: language === 'ar' ? 'سعود العتيبي (مدير)' : 'Saud Al-Otaibi (Manager)', action: language === 'ar' ? 'تجاوز حظر الائتمان' : 'Credit Block Override', details: language === 'ar' ? 'تجاوز حظر الائتمان لسوبرماركت السفير (45,000 ريال)' : 'Overrode credit block for Al-Safeer Supermarket (SAR 45,000)', risk: 'Sensitive' },
    { id: 'AUD-898', timestamp: '2026-09-07 11:30:19', user: language === 'ar' ? 'عمر فاروق (مندوب)' : 'Omar Farooq (Seller)', action: language === 'ar' ? 'تسليم نقدية' : 'Cash Handover Submitted', details: language === 'ar' ? 'تسليم 12,450 ريال لأمين صندوق مستودع الرياض WH-01' : 'Handed over SAR 12,450 to Riyadh WH-01 cashier', risk: 'Normal' },
    { id: 'AUD-897', timestamp: '2026-09-07 10:05:44', user: language === 'ar' ? 'الحماية الآلية للنظام' : 'System Auto Guard', action: language === 'ar' ? 'تنبيه حد النقدية' : 'Cash Limit Warning', details: language === 'ar' ? 'وصل المندوب فيصل (شاحنة #02) إلى حد النقدية 14,800 ريال' : 'Seller Faisal (Van #02) reached SAR 14,800 cash limit', risk: 'Critical' },
  ];

  const filteredLogs = auditLogsData.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(auditSearch.toLowerCase()) ||
                          log.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
                          log.details.toLowerCase().includes(auditSearch.toLowerCase());
    const matchesRisk = riskFilter === 'ALL' || log.risk === riskFilter;
    return matchesSearch && matchesRisk;
  });

  const handleToggle = async (ks) => {
    const currentActive = ks.active || ks.enabled || false;
    await toggleKillSwitch(ks.id);
    onShowToast(language === 'ar' ? `تم تغيير زر الطوارئ ${ks.id} إلى ${!currentActive ? 'مفعّل' : 'معطّل'}.` : `Emergency Kill-Switch ${ks.id} set to ${!currentActive ? 'ENABLED' : 'DISABLED'}.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Emergency Kill Switches Control Box */}
      <div className="panel-card" style={{ padding: '20px', borderLeft: language === 'ar' ? 'none' : '4px solid #b91c1c', borderRight: language === 'ar' ? '4px solid #b91c1c' : 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', color: '#991b1b', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={20} className="text-red-700" />
              <span>{t('emergencyKillSwitches')}</span>
            </h3>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {t('emergencyKillDesc')}
            </div>
          </div>
          <span className="badge badge-danger" style={{ padding: '6px 12px', fontSize: '11.5px', fontWeight: 700 }}>
            {t('rootAuthority')}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginTop: '16px' }}>
          {(killSwitches || []).map((ks) => {
            const isActive = ks.active || ks.enabled || false;
            return (
              <div 
                key={ks.id} 
                style={{ 
                  border: isActive ? '2px solid #dc2626' : '1px solid var(--border-color)', 
                  borderRadius: '6px', 
                  padding: '14px 16px', 
                  backgroundColor: isActive ? '#fef2f2' : '#fafcf9',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13.5px', color: isActive ? '#991b1b' : 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {isActive ? <Lock size={15} style={{ color: '#dc2626' }} /> : <Unlock size={15} style={{ color: '#15803d' }} />}
                    <span>{ks.name}</span>
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {ks.description}
                  </div>
                  {isActive && (
                    <div style={{ fontSize: '11px', color: '#b91c1c', fontWeight: 700, marginTop: '4px' }}>
                      {t('activeOverrideEngaged')}
                    </div>
                  )}
                </div>

                <button 
                  className={isActive ? 'btn-primary' : 'btn-secondary'}
                  style={{ 
                    backgroundColor: isActive ? '#dc2626' : 'transparent', 
                    borderColor: isActive ? '#dc2626' : 'var(--border-color)',
                    color: isActive ? '#ffffff' : 'var(--text-main)',
                    padding: '6px 12px',
                    fontSize: '11.5px',
                    whiteSpace: 'nowrap'
                  }}
                  onClick={() => handleToggle(ks)}
                >
                  <span>{isActive ? t('releaseLock') : t('engageLock')}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Enterprise Master Audit Log */}
      <div className="panel-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', backgroundColor: '#fafcf9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', color: 'var(--color-forest-dark)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileSpreadsheet size={18} className="text-emerald-800" />
              <span>{t('auditTrailTitle')}</span>
            </h3>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {t('auditTrailDesc')}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="header-search" style={{ width: '220px', margin: 0 }}>
              <Search size={14} className="search-icon-pos" />
              <input 
                type="text" 
                placeholder={t('searchPlaceholder')} 
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
              />
            </div>

            <select 
              className="form-select" 
              style={{ width: '130px', padding: '6px 10px', fontSize: '12px' }}
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
            >
              <option value="ALL">{language === 'ar' ? 'جميع مستويات الخطورة' : 'All Risk Tiers'}</option>
              <option value="Normal">{language === 'ar' ? 'عادي' : 'Normal'}</option>
              <option value="Sensitive">{language === 'ar' ? 'حساس' : 'Sensitive'}</option>
              <option value="Critical">{language === 'ar' ? 'حرج' : 'Critical'}</option>
            </select>
          </div>
        </div>

        <div className="erp-table-wrapper">
          <table className="erp-table">
            <thead>
              <tr>
                <th>{t('logId')}</th>
                <th>{t('timestamp')}</th>
                <th>{t('userExec')}</th>
                <th>{t('actionEvent')}</th>
                <th>{t('details')}</th>
                <th>{t('riskTier')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '12px' }}>{log.id}</td>
                  <td style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{log.timestamp}</td>
                  <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>{log.user}</td>
                  <td style={{ fontWeight: 600 }}>{log.action}</td>
                  <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{log.details}</td>
                  <td>
                    <span className={`badge ${
                      log.risk === 'Critical' ? 'badge-danger' : 
                      log.risk === 'Sensitive' ? 'badge-warning' : 
                      'badge-success'
                    }`}>
                      {log.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
