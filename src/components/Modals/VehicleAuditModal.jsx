import React, { useState } from 'react';
import { X, ClipboardCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const VehicleAuditModal = ({ onClose, onConfirm }) => {
  const { language, t } = useLanguage();
  const [vehicleId, setVehicleId] = useState('VH-02 (Isuzu D-Max - Seller: Khalid Mansoor)');
  const [sku] = useState('TOM-HYB-1KG');
  const [systemQty] = useState(120);
  const [actualQty, setActualQty] = useState(118);
  const [varianceReason, setVarianceReason] = useState(language === 'ar' ? 'نقص علبتين من رف الشاحنة. تم إحالة النقص لدفتر الإسقاط للمراجعة.' : '2 Cans missing from van shelf. Shortfall routed to write-off ledger for review.');

  const variance = actualQty - systemQty;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({
      vehicleId,
      sku,
      systemQty,
      actualQty,
      variance,
      varianceReason
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <span className="modal-title">{language === 'ar' ? 'الجرد الفعلي لمخزون الشاحنة' : 'Physical Audit of Vehicle Stock'}</span>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', padding: '10px 12px', borderRadius: '4px', fontSize: '11.5px', color: '#92400e', lineHeight: '1.4', wordBreak: 'break-word' }}>
            <strong>{language === 'ar' ? 'قاعدة النظام:' : 'System Rule:'}</strong> {language === 'ar' ? 'يقوم المدراء بالجرد الفعلي للشاحنات شهرياً أو عند الحاجة. تصدر مقارنة الموقع المعلن والفعلي والمقيد تقارير التباين. الفروقات غير المحسومة تحال للإسقاط.' : 'Managers perform physical audits on vehicles monthly or as required. Declared vs physical vs system positions produce variance reports. Unresolved shortfalls route to write-off for approval.'}
          </div>

          <div className="form-group">
            <span className="form-label">{language === 'ar' ? 'اختر الشاحنة والمندوب' : 'Select Vehicle & Seller'}</span>
            <select className="form-select" value={vehicleId} onChange={(e) => setVehicleId(e.target.value)}>
              <option value="VH-02 (Isuzu D-Max - Seller: Khalid Mansoor)">{language === 'ar' ? 'VH-02 (إيسوزو دي مكس - المندوب: خالد منصور) [محدد كمتأخر]' : 'VH-02 (Isuzu D-Max - Seller: Khalid Mansoor) [FLAGGED OVERDUE]'}</option>
              <option value="VH-01 (Toyota Hilux - Seller: Omar Farooq)">{language === 'ar' ? 'VH-01 (تويوتا هايلوكس - المندوب: عمر فاروق)' : 'VH-01 (Toyota Hilux - Seller: Omar Farooq)'}</option>
              <option value="VH-04 (Ford Ranger - Seller: Faisal Ahmed)">{language === 'ar' ? 'VH-04 (فورد رينجر - المندوب: فيصل أحمد)' : 'VH-04 (Ford Ranger - Seller: Faisal Ahmed)'}</option>
            </select>
          </div>

          <div className="modal-form-grid">
            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'كمية النظام (أكياس/علب)' : 'System Qty (Bags/Cans)'}</span>
              <input type="number" className="form-input" value={systemQty} disabled />
            </div>

            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'العد الفعلي الميداني' : 'Actual Physical Count'}</span>
              <input type="number" className="form-input" value={actualQty} onChange={(e) => setActualQty(e.target.value)} />
            </div>

            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'التباين المحسوب' : 'Calculated Variance'}</span>
              <input type="text" className="form-input" value={language === 'ar' ? `${variance} وحدة` : `${variance} Units`} disabled style={{ color: variance < 0 ? '#991b1b' : '#166534', fontWeight: 700 }} />
            </div>
          </div>

          <div className="form-group">
            <span className="form-label">{language === 'ar' ? 'توضيح / ملاحظة التباين (مطلوب عند الفروقات)' : 'Variance Explanation / Comment (Required for differences)'}</span>
            <textarea className="form-textarea" rows={2} value={varianceReason} onChange={(e) => setVarianceReason(e.target.value)} required />
          </div>

          <div className="modal-footer" style={{ margin: '10px -16px -16px -16px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>{t('cancel')}</button>
            <button type="submit" className="btn-primary">
              <ClipboardCheck size={14} />
              <span>{language === 'ar' ? 'حفظ الجرد الفعلي وإنشاء تقرير التباين' : 'Save Physical Audit & Generate Variance Report'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
