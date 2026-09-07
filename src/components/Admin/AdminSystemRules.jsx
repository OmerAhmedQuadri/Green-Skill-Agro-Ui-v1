import React, { useState } from 'react';
import { Sliders, Save, CheckCircle, ShieldAlert, Lock, Clock, DollarSign, Percent } from 'lucide-react';
import { useManagerContext } from '../../context/ManagerContext';
import { useLanguage } from '../../context/LanguageContext';

export const AdminSystemRules = ({ onShowToast }) => {
  const { systemRules, updateSystemRules } = useManagerContext();
  const { language, t } = useLanguage();
  const [config, setConfig] = useState(() => systemRules || { maxSellerDiscountPct: 10, maxSellerCashCeiling: 12000, storeCreditGraceDays: 7, expiryWarningWindowDays: 30, lastUpdatedBy: 'Admin System Owner', lastUpdatedAt: 'Just Now' });
  const [saved, setSaved] = useState(false);

  const handleChange = (field, val) => {
    setConfig(prev => ({ ...prev, [field]: Number(val) }));
    setSaved(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await updateSystemRules(config);
    setSaved(true);
    if (onShowToast) {
      onShowToast(language === 'ar' ? 'تم تحديث قواعد وسقوف النظام! تم حفظ الإعدادات الجديدة.' : `System Rules & Ceilings Updated! New parameters saved to master governance ledger.`);
    }
  };

  return (
    <div className="admin-page-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="data-panel" style={{ padding: '18px', minHeight: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-forest-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={18} />
              <span>{t('systemRulesTitle')}</span>
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {t('systemRulesDesc')}
            </div>
          </div>

          <button className="btn-primary" onClick={handleSave} style={{ gap: '6px' }}>
            <Save size={14} />
            <span>{t('saveSystemParams')}</span>
          </button>
        </div>

        {saved && (
          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '10px 14px', borderRadius: '6px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <CheckCircle size={16} />
            <span>{t('paramsSavedSuccess')}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="modal-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {/* Card 1: Seller Discount Ceiling */}
          <div className="side-panel-card" style={{ padding: '14px', gap: '10px' }}>
            <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-forest-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Percent size={15} />
              <span>{t('maxSellerDiscount')}</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {t('maxDiscountDesc')}
            </div>
            <div className="form-group" style={{ marginTop: '4px' }}>
              <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>{t('permittedDiscountLabel')}</label>
              <input 
                type="number" 
                className="form-input"
                style={{ fontSize: '13px', padding: '8px', width: '100%' }}
                value={config.maxSellerDiscountPct}
                onChange={(e) => handleChange('maxSellerDiscountPct', e.target.value)}
              />
            </div>
            <div style={{ fontSize: '11px', backgroundColor: '#fffbeb', border: '1px solid #fde68a', color: '#92400e', padding: '6px 8px', borderRadius: '4px' }}>
              {t('discountRuleNote')}
            </div>
          </div>

          {/* Card 2: Daily Cash Ceiling */}
          <div className="side-panel-card" style={{ padding: '14px', gap: '10px' }}>
            <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-forest-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <DollarSign size={15} />
              <span>{t('dailyCashCeiling')}</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {t('maxCashDesc')}
            </div>
            <div className="form-group" style={{ marginTop: '4px' }}>
              <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>{t('maxCashLimitLabel')}</label>
              <input 
                type="number" 
                className="form-input"
                style={{ fontSize: '13px', padding: '8px', width: '100%' }}
                value={config.maxSellerCashCeiling}
                onChange={(e) => handleChange('maxSellerCashCeiling', e.target.value)}
              />
            </div>
            <div style={{ fontSize: '11px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '6px 8px', borderRadius: '4px' }}>
              {t('cashLockNote')}
            </div>
          </div>

          {/* Card 3: Store Credit Grace Period */}
          <div className="side-panel-card" style={{ padding: '14px', gap: '10px' }}>
            <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-forest-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={15} />
              <span>{t('storeCreditGrace')}</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {t('creditGraceDesc')}
            </div>
            <div className="form-group" style={{ marginTop: '4px' }}>
              <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>{t('graceDaysLabel')}</label>
              <input 
                type="number" 
                className="form-input"
                style={{ fontSize: '13px', padding: '8px', width: '100%' }}
                value={config.storeCreditGraceDays}
                onChange={(e) => handleChange('storeCreditGraceDays', e.target.value)}
              />
            </div>
            <div style={{ fontSize: '11px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '6px 8px', borderRadius: '4px' }}>
              {t('creditLockNote')}
            </div>
          </div>

          {/* Card 4: FEFO Expiry Warning Window */}
          <div className="side-panel-card" style={{ padding: '14px', gap: '10px' }}>
            <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-forest-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={15} />
              <span>{t('expiryWarningWindow')}</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {t('expiryWindowDesc')}
            </div>
            <div className="form-group" style={{ marginTop: '4px' }}>
              <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>{t('warningDaysLabel')}</label>
              <input 
                type="number" 
                className="form-input"
                style={{ fontSize: '13px', padding: '8px', width: '100%' }}
                value={config.expiryWarningWindowDays}
                onChange={(e) => handleChange('expiryWarningWindowDays', e.target.value)}
              />
            </div>
            <div style={{ fontSize: '11px', backgroundColor: '#fffbeb', border: '1px solid #fde68a', color: '#92400e', padding: '6px 8px', borderRadius: '4px' }}>
              {t('fefoAlertNote')}
            </div>
          </div>
        </form>

        <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-color)', fontSize: '11.5px', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>{language === 'ar' ? `سجل الحوكمة: آخر تحديث بواسطة ${config.lastUpdatedBy}` : `Governance Record: Last updated by ${config.lastUpdatedBy}`}</div>
          <span className="badge badge-success">
            <ShieldAlert size={12} />
            {language === 'ar' ? 'الحوكمة العامة نشطة' : 'Master Governance Active'}
          </span>
        </div>
      </div>
    </div>
  );
};
