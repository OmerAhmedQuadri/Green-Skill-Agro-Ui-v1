import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, RotateCcw } from 'lucide-react';
import { useManagerContext } from '../../context/ManagerContext';
import { useLanguage } from '../../context/LanguageContext';

export const AdminFeatureToggles = ({ onShowToast }) => {
  const { language, t } = useLanguage();
  const { featureToggles, toggleFeature } = useManagerContext();
  const toggles = featureToggles || [];

  const [returnPolicy, setReturnPolicy] = useState({
    maxReturnDays: 14,
    restockingFeePct: 5,
    requirePhotoEvidence: true,
    autoRestockGoodBatches: true
  });

  const handleToggle = async (id, featureName, currentEnabled) => {
    const updated = !currentEnabled;
    await toggleFeature(id);
    if (onShowToast) {
      onShowToast(language === 'ar' ? `تم تعيين الميزة "${featureName}" إلى ${updated ? 'مفعل' : 'معطل'}.` : `Feature "${featureName}" set to ${updated ? 'ENABLED' : 'DISABLED'}.`);
    }
  };

  const handleSaveReturnPolicy = (e) => {
    e.preventDefault();
    if (onShowToast) {
      onShowToast(language === 'ar' ? `تم تحديث قواعد سياسة الإرجاع! نافذة الإرجاع القصوى: ${returnPolicy.maxReturnDays} يوماً، رسوم إعادة التخزين: ${returnPolicy.restockingFeePct}%.` : `Return Policy Rules updated! Max Return Window: ${returnPolicy.maxReturnDays} Days, Restocking Fee: ${returnPolicy.restockingFeePct}%.`);
    }
  };

  return (
    <div className="admin-page-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* SECTION 1: System Feature Toggles */}
      <div className="data-panel" style={{ minHeight: 'auto' }}>
        <div className="panel-header-toolbar">
          <div className="panel-main-title">
            <ToggleLeft size={16} />
            <span>{language === 'ar' ? 'مفاتيح تفعيل ميزات النظام والسياسات التشغيلية' : 'System Feature Toggles & Operational Policies'}</span>
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
            {language === 'ar' ? 'تفعيل أو تعطيل ميزات المنصة وأقفال الحوكمة الآلية عبر جرين سكيل أقرو.' : 'Enable or disable platform features and automated governance locks across Green Skill Agro.'}
          </div>
        </div>

        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {toggles.map((t) => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: t.enabled ? '#ffffff' : '#fcfdfd' }}>
              <div style={{ flex: 1, paddingRight: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-forest-dark)' }}>{t.featureName}</span>
                  <span className="badge badge-info" style={{ fontSize: '10px' }}>{t.category}</span>
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {t.description}
                </div>
              </div>

              <button 
                className={t.enabled ? 'btn-primary' : 'btn-secondary'}
                style={{ minWidth: '110px', justifyContent: 'center', height: '36px' }}
                onClick={() => handleToggle(t.id, t.featureName, t.enabled)}
              >
                {t.enabled ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                <span>{t.enabled ? (language === 'ar' ? 'مفعل' : 'Active') : (language === 'ar' ? 'معطل' : 'Disabled')}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Return Policy Rules */}
      <div className="data-panel" style={{ padding: '16px', minHeight: 'auto' }}>
        <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-forest-dark)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <RotateCcw size={16} />
          <span>{language === 'ar' ? 'سياسة إرجاع المنتجات وقواعد إعادة التخزين' : 'Product Return Policy & Restocking Rules'}</span>
        </div>

        <form onSubmit={handleSaveReturnPolicy} className="modal-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>{language === 'ar' ? 'الحد الأقصى المسموح به لنافذة الإرجاع (أيام)' : 'Max Allowable Return Window (Days)'}</label>
            <input 
              type="number" 
              className="form-input"
              value={returnPolicy.maxReturnDays}
              onChange={(e) => setReturnPolicy({ ...returnPolicy, maxReturnDays: Number(e.target.value) })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>{language === 'ar' ? 'نسبة رسوم إعادة التخزين (%)' : 'Restocking Fee (%)'}</label>
            <input 
              type="number" 
              className="form-input"
              value={returnPolicy.restockingFeePct}
              onChange={(e) => setReturnPolicy({ ...returnPolicy, restockingFeePct: Number(e.target.value) })}
            />
          </div>

          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <button type="submit" className="btn-primary" style={{ height: '38px', justifyContent: 'center' }}>
              <span>{language === 'ar' ? 'تحديث قواعد سياسة الإرجاع' : 'Update Return Policy Rules'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
