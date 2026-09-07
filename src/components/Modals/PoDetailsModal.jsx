import React from 'react';
import { X, FileText, CheckCircle, Clock, Truck, ShieldCheck, DollarSign, Calendar, Tag } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const PoDetailsModal = ({ po, onClose, onApprovePo }) => {
  const { language, t } = useLanguage();
  if (!po) return null;

  const PO_LIFECYCLE_STATES = [
    language === 'ar' ? '1. مسودة' : '1. Draft',
    language === 'ar' ? '2. قيد موافقة الأدمن' : '2. Pending Approval',
    language === 'ar' ? '3. معتمد من الأدمن' : '3. Approved by Admin',
    language === 'ar' ? '4. مؤكد من المورد' : '4. Vendor Confirmed',
    language === 'ar' ? '5. تم الشحن من المصدر' : '5. Shipped from Origin',
    language === 'ar' ? '6. قيد النقل والشحن' : '6. In Transit',
    language === 'ar' ? '7. مستلم جزئياً' : '7. Partially Received',
    language === 'ar' ? '8. مستلم بالكامل (سند الاستلام)' : '8. Fully Received (GRN)',
    language === 'ar' ? '9. مغلق ومصفى' : '9. Closed & Settled'
  ];

  const currentStateIndex = po.stateIndex || 1;

  const handleApprove = async () => {
    if (onApprovePo) {
      await onApprovePo(po.poNumber);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} style={{ color: 'var(--color-forest-dark)' }} />
            <div>
              <span className="modal-title" style={{ fontSize: '15px' }}>{language === 'ar' ? 'أمر الشراء ' : 'Purchase Order '}{po.poNumber}</span>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{po.vendorName} ({po.vendorCode || 'VND-MASTER'})</div>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Key Metric Highlights */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <div style={{ backgroundColor: 'var(--bg-surface-subtle)', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <DollarSign size={11} /> {language === 'ar' ? 'إجمالي قيمة أمر الشراء' : 'PO Total Value'}
              </div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-forest-dark)', marginTop: '2px' }}>
                {language === 'ar' ? `${po.totalValue?.toLocaleString()} ريال` : `SAR ${po.totalValue?.toLocaleString()}`}
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-surface-subtle)', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={11} /> {language === 'ar' ? 'الوصول المتوقع' : 'Expected Arrival'}
              </div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)', marginTop: '4px' }}>
                {po.expectedArrival || 'TBD'}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{language === 'ar' ? `مدة التوريد: ${po.leadTimeDays || 30} يوماً` : `Lead time: ${po.leadTimeDays || 30} days`}</div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-surface-subtle)', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={11} /> {language === 'ar' ? 'حالة الاعتماد' : 'Approval Status'}
              </div>
              <div style={{ marginTop: '4px' }}>
                <span className={`badge ${po.stateIndex === 6 ? 'badge-info' : po.stateIndex === 1 ? 'badge-warning' : 'badge-success'}`}>
                  {po.adminApprovalStatus || po.stateName || (language === 'ar' ? 'نشط' : 'Active')}
                </span>
              </div>
            </div>
          </div>

          {/* Items Summary Breakdown */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px' }}>
            <div style={{ fontSize: '11.5px', fontWeight: '700', color: 'var(--color-forest-dark)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Tag size={12} />
              <span>{language === 'ar' ? 'ملخص أصناف أمر الشراء' : 'Purchased Line Items Summary'}</span>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-main)', fontWeight: '500', lineHeight: '1.4' }}>
              {po.itemsSummary}
            </div>
          </div>

          {/* Additional Metadata */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-color-light)' }}>
              <span style={{ color: 'var(--text-muted)' }}>{language === 'ar' ? 'تاريخ الإنشاء:' : 'Date Raised:'}</span>
              <strong>{po.dateRaised || '2026-09-01'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-color-light)' }}>
              <span style={{ color: 'var(--text-muted)' }}>{language === 'ar' ? 'مصدر الطلب:' : 'Reorder Source:'}</span>
              <strong>{po.reorderSource || (language === 'ar' ? 'توصية النظام لإعادة الطلب' : 'System Reorder Recommendation')}</strong>
            </div>
          </div>

          {/* 9-State Lifecycle Stepper */}
          <div>
            <div style={{ fontSize: '11.5px', fontWeight: '700', color: 'var(--color-forest-dark)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Truck size={12} />
              <span>{language === 'ar' ? 'متابعة دورة حياة المشتريات (9 مراحل)' : '9-State Procurement Lifecycle Tracking'}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', backgroundColor: 'var(--bg-surface-subtle)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              {PO_LIFECYCLE_STATES.map((stateLabel, idx) => {
                const stepNum = idx + 1;
                const isCurrent = stepNum === currentStateIndex;
                const isPassed = stepNum < currentStateIndex;

                return (
                  <div 
                    key={stateLabel}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '5px 8px',
                      borderRadius: '4px',
                      backgroundColor: isCurrent ? '#dcfce7' : isPassed ? '#f0fdf4' : 'transparent',
                      border: isCurrent ? '1px solid #86efac' : '1px solid transparent',
                      fontWeight: isCurrent ? '700' : '400',
                      fontSize: '11.5px',
                      color: isCurrent ? '#14532d' : isPassed ? '#166534' : 'var(--text-muted)'
                    }}
                  >
                    {isPassed ? (
                      <CheckCircle size={13} style={{ color: '#16a34a' }} />
                    ) : isCurrent ? (
                      <Clock size={13} style={{ color: '#d97706' }} />
                    ) : (
                      <div style={{ width: 13, height: 13, borderRadius: '50%', border: '1px solid #cbd5e1' }} />
                    )}
                    <span>{stateLabel}</span>
                    {isCurrent && (
                      <span className="badge badge-warning" style={{ marginLeft: 'auto', fontSize: '9.5px' }}>
                        {language === 'ar' ? 'المرحلة الحالية' : 'Current Stage'}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>{t('cancel')}</button>
          {currentStateIndex <= 2 && onApprovePo && (
            <button className="btn-primary" onClick={handleApprove}>
              <CheckCircle size={14} />
              <span>{language === 'ar' ? 'اعتماد وإصدار أمر الشراء' : 'Approve & Issue PO'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
