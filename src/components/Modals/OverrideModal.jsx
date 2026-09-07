import React, { useState } from 'react';
import { X, Lock, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const OverrideModal = ({ item, onClose, onConfirm }) => {
  const { language, t } = useLanguage();
  const [overrideReason, setOverrideReason] = useState('');

  if (!item) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <span className="modal-title">{language === 'ar' ? 'منح تجاوز المدير لحظر الائتمان' : 'Grant Manager Credit Block Override'}</span>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '10px 12px', borderRadius: '4px', fontSize: '12px', color: '#991b1b', display: 'flex', gap: '8px', lineHeight: '1.4', wordBreak: 'break-word' }}>
            <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <strong>{language === 'ar' ? 'قاعدة القسم 07:' : 'Section 07 Rule:'}</strong> {language === 'ar' ? 'المتجر المتأخر في السداد أو المتجاوز للحد الائتماني يحظر من المبيعات الإضافية. يتطلب كل تجاوز مبرراً كتابياً صريحاً مسجلاً في سجل النظام.' : 'A store that is past due or over its credit limit is blocked from further sales. Every override requires an explicit recorded reason in the system audit log.'}
            </div>
          </div>

          <div className="modal-form-grid" style={{ fontSize: '12px' }}>
            <div>
              <span className="form-label">{language === 'ar' ? 'اسم المتجر' : 'Store Name'}</span>
              <div style={{ fontWeight: 600 }}>{item.storeName}</div>
            </div>
            <div>
              <span className="form-label">{language === 'ar' ? 'دورة الائتمان' : 'Credit Cycle'}</span>
              <div style={{ fontWeight: 600 }}>{item.creditCycle}</div>
            </div>
            <div>
              <span className="form-label">{language === 'ar' ? 'الحد الائتماني' : 'Credit Limit'}</span>
              <div style={{ fontWeight: 600 }}>{language === 'ar' ? `${item.creditLimit?.toLocaleString()} ريال` : `SAR ${item.creditLimit?.toLocaleString()}`}</div>
            </div>
            <div>
              <span className="form-label">{language === 'ar' ? 'المبلغ المستحق الحالي' : 'Current Outstanding'}</span>
              <div style={{ fontWeight: 700, color: '#991b1b' }}>{language === 'ar' ? `${item.currentOutstanding?.toLocaleString()} ريال` : `SAR ${item.currentOutstanding?.toLocaleString()}`}</div>
            </div>
          </div>

          <div className="form-group">
            <span className="form-label">{language === 'ar' ? 'سبب التجاوز الكتابي المبرر للمدير *' : 'Required Written Manager Override Reason'}</span>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder={language === 'ar' ? 'اذكر المبرر التشغيلي للتجاوز (مثال: استلام شيك مؤجل موثق / موافقة أدمن خاصة)...' : 'State explicit operational justification for overriding credit limit (e.g. Confirmed post-dated cheque received / Admin special approval)...'}
              value={overrideReason}
              onChange={(e) => setOverrideReason(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>{t('cancel')}</button>
          <button 
            className="btn-primary" 
            style={{ backgroundColor: '#92400e', borderColor: '#78350f' }}
            disabled={!overrideReason.trim()}
            onClick={() => onConfirm(item, overrideReason)}
          >
            <Lock size={14} />
            <span>{language === 'ar' ? 'تأكيد وتسجيل التجاوز' : 'Confirm & Record Override'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
