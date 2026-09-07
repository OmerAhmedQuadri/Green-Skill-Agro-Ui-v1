import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const WriteOffModal = ({ item, onClose, onConfirm }) => {
  const { language, t } = useLanguage();
  const [managerNotes, setManagerNotes] = useState('');

  if (!item) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <span className="modal-title">{language === 'ar' ? `الموافقة على طلب إسقاط المخزون #${item.id}` : `Approve Stock Write-off Request #${item.id}`}</span>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', padding: '10px 12px', borderRadius: '4px', fontSize: '12px', color: '#92400e', display: 'flex', gap: '8px', lineHeight: '1.4', wordBreak: 'break-word' }}>
            <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <strong>{language === 'ar' ? 'قاعدة النظام:' : 'System Rule:'}</strong> {language === 'ar' ? 'اعتماد هذا الإسقاط يزيل المخزون بشكل دائم من موقع الحيازة ويسجله في دفتر الإسقاطات.' : 'Approving this write-off permanently removes stock from the holding location ledger and posts to the write-off journal.'}
            </div>
          </div>

          <div className="modal-form-grid" style={{ fontSize: '12px' }}>
            <div>
              <span className="form-label">{language === 'ar' ? 'الرمز (SKU) / الصنف' : 'SKU / Item'}</span>
              <div style={{ fontWeight: 600 }}>{item.productName}</div>
              <div className="code-cell" style={{ display: 'inline-block', marginTop: '2px' }}>{item.sku}</div>
            </div>
            <div>
              <span className="form-label">{language === 'ar' ? 'رقم التشغيلة (LOT)' : 'LOT / Batch Number'}</span>
              <div style={{ fontWeight: 600 }}>{item.lotNumber}</div>
            </div>
            <div>
              <span className="form-label">{language === 'ar' ? 'الكمية وقيمة الخسارة' : 'Quantity & Loss Value'}</span>
              <div style={{ fontWeight: 700, color: '#991b1b' }}>{language === 'ar' ? `${item.quantity} (${item.totalValue?.toLocaleString()} ريال)` : `${item.quantity} (SAR ${item.totalValue?.toLocaleString()})`}</div>
            </div>
            <div>
              <span className="form-label">{language === 'ar' ? 'موقع الحيازة' : 'Holding Location'}</span>
              <div style={{ fontWeight: 600 }}>{item.holdingLocation}</div>
            </div>
          </div>

          <div className="form-group">
            <span className="form-label">{language === 'ar' ? 'السبب المرفوع' : 'Reason Submitted'}</span>
            <div style={{ padding: '8px', background: '#f8faf8', border: '1px solid #dce3da', borderRadius: '4px', fontSize: '12px', wordBreak: 'break-word' }}>
              {item.reason}
            </div>
          </div>

          <div className="form-group">
            <span className="form-label">{language === 'ar' ? 'إثبات الصورة الفوتوغرافية' : 'Photographic Proof Evidence'}</span>
            <div className="photo-preview-box">
              <img src={item.photoEvidence} alt="Evidence" style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>
          </div>

          <div className="form-group">
            <span className="form-label">{language === 'ar' ? 'ملاحظة اعتماد المدير (اختياري)' : 'Manager Approval Audit Comment (Optional)'}</span>
            <textarea
              className="form-textarea"
              rows={2}
              placeholder={language === 'ar' ? 'أدخل ملاحظات الاعتماد لسجل الرقابة...' : 'Enter authorization notes for audit log...'}
              value={managerNotes}
              onChange={(e) => setManagerNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>{t('cancel')}</button>
          <button className="btn-primary" onClick={() => onConfirm(item, managerNotes)}>
            <CheckCircle size={14} />
            <span>{language === 'ar' ? 'تأكيد وتنفيذ الإسقاط' : 'Confirm & Execute Write-off'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
