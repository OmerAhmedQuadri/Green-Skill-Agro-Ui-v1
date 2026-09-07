import React, { useState } from 'react';
import { X, FileText } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const CreatePoModal = ({ onClose, onConfirm }) => {
  const { language, t } = useLanguage();
  const [vendor, setVendor] = useState('Emirates Seed Corp (VND-EMIRATES-01)');
  const [itemsSummary, setItemsSummary] = useState('500x Tomato F1 1KG Cans, 200x Cucumber Alpha 500g');
  const [totalValue, setTotalValue] = useState(145000);
  const [leadTimeDays, setLeadTimeDays] = useState(35);
  const [expectedArrival, setExpectedArrival] = useState('2026-10-10');

  const handleSubmit = (e) => {
    e.preventDefault();
    const poNumber = `PO-2026-${Math.floor(100 + Math.random() * 900)}`;
    onConfirm({
      poNumber,
      vendorName: vendor.split(' (')[0],
      vendorCode: vendor.split('(')[1]?.replace(')', '') || 'VND-01',
      itemsSummary,
      totalValue: Number(totalValue),
      stateIndex: 1,
      stateName: language === 'ar' ? '1. مسودة' : '1. Draft',
      dateRaised: new Date().toISOString().split('T')[0],
      expectedArrival,
      leadTimeDays: Number(leadTimeDays),
      adminApprovalStatus: language === 'ar' ? 'مسودة (مرفوعة لموافقة الأدمن)' : 'Draft (Submitted for Admin Approval)',
      reorderSource: language === 'ar' ? 'إدخال مسودة المدير' : 'Manager Draft Entry'
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <span className="modal-title">{language === 'ar' ? 'إنشاء أمر شراء (مسودة)' : 'Raise Purchase Order (Draft)'}</span>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', padding: '10px 12px', borderRadius: '4px', fontSize: '11.5px', color: '#92400e', lineHeight: '1.4', wordBreak: 'break-word' }}>
            <strong>{language === 'ar' ? 'قاعدة النظام:' : 'System Rule:'}</strong> {language === 'ar' ? 'يمكن للمدراء إعداد مسودات أوامر الشراء بناءً على توصيات إعادة الطلب. تبقى الموافقة دائمًا بيد الأدمن قبل إرسال الطلب للموردين (مدة التوريد 30-40 يوماً).' : 'Managers can draft purchase orders based on reorder recommendations. Approval always rests with an Admin before placing the order with vendors (30-40 day lead time).'}
          </div>

          <div className="form-group">
            <span className="form-label">{language === 'ar' ? 'اختر المورد' : 'Select Vendor'}</span>
            <select className="form-select" value={vendor} onChange={(e) => setVendor(e.target.value)}>
              <option value="Emirates Seed Corp (VND-EMIRATES-01)">{language === 'ar' ? 'شركة الإمارات للبذور (استيراد الإمارات - 35 يوماً توريد)' : 'Emirates Seed Corp (UAE Import - 35d lead time)'}</option>
              <option value="Royal Dutch Seeds (VND-ROYAL-DUTCH)">{language === 'ar' ? 'بذور الهولندية الملكية (استيراد هولندا - 40 يوماً توريد)' : 'Royal Dutch Seeds BV (Netherlands Import - 40d lead time)'}</option>
              <option value="Al-Riyadh Agri Nets Co. (VND-RIYADH-NETS)">{language === 'ar' ? 'شركة شباك الرياض الزراعية (مكفول محلي KSA - 15 يوماً توريد)' : 'Al-Riyadh Agri Nets Co. (KSA Local - 15d lead time)'}</option>
              <option value="Jordan Agri Chemicals (VND-JORDAN-AGRI)">{language === 'ar' ? 'الأردن للكيماويات الزراعية (استيراد الأردن - 30 يوماً توريد)' : 'Jordan Agri Chemicals (Jordan Import - 30d lead time)'}</option>
            </select>
          </div>

          <div className="form-group">
            <span className="form-label">{language === 'ar' ? 'ملخص أصناف الطلب' : 'Order Items Summary'}</span>
            <input type="text" className="form-input" value={itemsSummary} onChange={(e) => setItemsSummary(e.target.value)} required />
          </div>

          <div className="modal-form-grid">
            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'القيمة الإجمالية (ريال)' : 'Total Value (SAR)'}</span>
              <input type="number" className="form-input" value={totalValue} onChange={(e) => setTotalValue(e.target.value)} />
            </div>

            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'مدة التوريد الاستيرادي (أيام)' : 'Import Lead Time (Days)'}</span>
              <input type="number" className="form-input" value={leadTimeDays} onChange={(e) => setLeadTimeDays(e.target.value)} />
            </div>

            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'تاريخ الوصول المتوقع' : 'Expected Arrival Date'}</span>
              <input type="date" className="form-input" value={expectedArrival} onChange={(e) => setExpectedArrival(e.target.value)} />
            </div>
          </div>

          <div className="modal-footer" style={{ margin: '10px -16px -16px -16px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>{t('cancel')}</button>
            <button type="submit" className="btn-primary">
              <FileText size={14} />
              <span>{language === 'ar' ? 'حفظ المسودة وإرسالها لموافقة الأدمن' : 'Save Draft & Submit to Admin for Approval'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
