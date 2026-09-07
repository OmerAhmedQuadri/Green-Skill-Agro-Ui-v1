import React, { useState } from 'react';
import { X, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const SkuConversionModal = ({ onClose, onConfirm }) => {
  const { language, t } = useLanguage();
  const [sourceSku, setSourceSku] = useState('OKRA-PK-5KG (Okra 5 kg Bag)');
  const [targetSku, setTargetSku] = useState('OKRA-PK-1KG (Okra 1 kg Pouch)');
  const [sourceQty, setSourceQty] = useState(20);
  const [targetQty, setTargetQty] = useState(98);
  const [lossQty, setLossQty] = useState(2);
  const [reason, setReason] = useState(language === 'ar' ? 'إعادة تعبئة أكياس 5 كجم إلى عبوات 1 كجم لتلبية طلب شاحنات المبيعات. تم تسجيل 2 كجم فقد.' : 'Repackaging 5kg bags into 1kg pouches for field van demand. 2kg spillage recorded.');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({
      sourceSku,
      targetSku,
      sourceQty: Number(sourceQty),
      targetQty: Number(targetQty),
      lossQty: Number(lossQty),
      reason
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <span className="modal-title">{language === 'ar' ? 'تحويل الرمز (SKU) وإعادة تعبئة المخزون' : 'Convert SKU & Repackage Stock'}</span>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '10px 12px', borderRadius: '4px', fontSize: '11.5px', color: '#1e40af', lineHeight: '1.4', wordBreak: 'break-word' }}>
            <strong>{language === 'ar' ? 'قاعدة النظام:' : 'System Rule:'}</strong> {language === 'ar' ? 'يحول المخزون من حجم عبوة/تغليف إلى آخر (مثال: أكياس 5 كجم إلى عبوات 1 كجم). تنتقل أرقام التشغيلة (LOT) وتاريخ الإنتاج والانتهاء دون تغيير. يسجل الفقد تلقائياً في دفتر الإسقاط.' : 'Converts stock from one pack size/packaging to another (e.g. 5kg bags to 1kg pouches). LOT #, MFD, and Expiry carry across unchanged. Loss quantity automatically posts to the write-off ledger.'}
          </div>

          <div className="modal-form-grid">
            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'الرمز المصدر (عبوة جملة/كبيرة)' : 'Source SKU (Bulk Pack)'}</span>
              <select className="form-select" value={sourceSku} onChange={(e) => setSourceSku(e.target.value)}>
                <option value="OKRA-PK-5KG (Okra 5 kg Bag)">{language === 'ar' ? 'OKRA-PK-5KG (كيس بامية 5 كجم)' : 'OKRA-PK-5KG (Okra 5 kg Bag)'}</option>
                <option value="TOM-HYB-5KG (Tomato 5 kg Can)">{language === 'ar' ? 'TOM-HYB-5KG (علبة طماطم 5 كجم)' : 'TOM-HYB-5KG (Tomato 5 kg Can)'}</option>
              </select>
            </div>

            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'الرمز المستهدف (عبوة تجزئة)' : 'Target SKU (Retail Pack)'}</span>
              <select className="form-select" value={targetSku} onChange={(e) => setTargetSku(e.target.value)}>
                <option value="OKRA-PK-1KG (Okra 1 kg Pouch)">{language === 'ar' ? 'OKRA-PK-1KG (عبوة بامية 1 كجم)' : 'OKRA-PK-1KG (Okra 1 kg Pouch)'}</option>
                <option value="TOM-HYB-1KG (Tomato 1 kg Can)">{language === 'ar' ? 'TOM-HYB-1KG (علبة طماطم 1 كجم)' : 'TOM-HYB-1KG (Tomato 1 kg Can)'}</option>
              </select>
            </div>
          </div>

          <div className="modal-form-grid">
            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'الوحدات المصدر المحولة' : 'Source Units Converted'}</span>
              <input type="number" className="form-input" value={sourceQty} onChange={(e) => setSourceQty(e.target.value)} />
            </div>

            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'الوحدات المستهدفة المنتجة' : 'Target Units Produced'}</span>
              <input type="number" className="form-input" value={targetQty} onChange={(e) => setTargetQty(e.target.value)} />
            </div>

            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'فقد إعادة التعبئة (كجم/وحدات)' : 'Repackaging Loss (kg/units)'}</span>
              <input type="number" className="form-input" value={lossQty} onChange={(e) => setLossQty(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <span className="form-label">{language === 'ar' ? 'سبب التحويل (سجل كتابي مطلوب)' : 'Conversion Reason (Written Record Required)'}</span>
            <textarea className="form-textarea" rows={2} value={reason} onChange={(e) => setReason(e.target.value)} required />
          </div>

          <div className="modal-footer" style={{ margin: '10px -16px -16px -16px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>{t('cancel')}</button>
            <button type="submit" className="btn-primary">
              <RefreshCw size={14} />
              <span>{language === 'ar' ? 'تنفيذ التحويل وتحديث السجل' : 'Execute Conversion & Update Ledger'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
