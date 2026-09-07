import React, { useState } from 'react';
import { X, Send, Upload } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const DispatchModal = ({ item, onClose, onConfirm }) => {
  const { language, t } = useLanguage();
  const [transporter, setTransporter] = useState('Al-Majdouie Logistics');
  const [driverName, setDriverName] = useState('Mohammed Al-Subaie');
  const [slipFile] = useState('RELEASE-SLIP-WH01-8842.pdf');

  if (!item) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <span className="modal-title">{language === 'ar' ? `معالجة إذن صرف وتوزيع المستودع #${item.id}` : `Process Warehouse Dispatch #${item.id}`}</span>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '10px 12px', borderRadius: '4px', fontSize: '12px', color: '#1e40af', lineHeight: '1.4', wordBreak: 'break-word' }}>
            <strong>{language === 'ar' ? 'قاعدة النظام:' : 'System Rule:'}</strong> {language === 'ar' ? `عند عدم كفاية مخزون الشاحنة، يتم شحن البضائع مباشرة من المستودع WH-01 إلى المتجر. وتظل العملية مسجلة لصالح المندوب ` : 'When vehicle stock is insufficient, goods are shipped directly from Warehouse WH-01 to the store. The sale remains attributed to seller '}<strong>{item.sellerName}</strong>.
          </div>

          <div className="modal-form-grid" style={{ fontSize: '12px' }}>
            <div>
              <span className="form-label">{language === 'ar' ? 'المتجر المستهدف' : 'Target Store'}</span>
              <div style={{ fontWeight: 600 }}>{item.storeName}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.location}</div>
            </div>
            <div>
              <span className="form-label">{language === 'ar' ? 'قيمة الطلب' : 'Order Value'}</span>
              <div style={{ fontWeight: 700, color: 'var(--color-forest-dark)' }}>{language === 'ar' ? `${item.orderValue?.toLocaleString()} ريال` : `SAR ${item.orderValue?.toLocaleString()}`}</div>
            </div>
          </div>

          <div className="form-group">
            <span className="form-label">{language === 'ar' ? 'شركة النقل / الشاحنة المعينة' : 'Assigned Transport Carrier'}</span>
            <select
              className="form-select"
              value={transporter}
              onChange={(e) => setTransporter(e.target.value)}
            >
              <option value="Al-Majdouie Logistics">{language === 'ar' ? 'المجدوعي للشحن واللوجستيات (شحن مؤجر)' : 'Al-Majdouie Logistics (Hired Freight)'}</option>
              <option value="Saudi Post Logistics">{language === 'ar' ? 'سبل - سُبل اللوجستية (SPL Express)' : 'Saudi Post Logistics (SPL Express)'}</option>
              <option value="Green Skill Agro Internal Fleet (WH-01)">{language === 'ar' ? 'أسطول جرين سكيل أقرو الداخلي (شاحنة المستودع WH-01)' : 'Green Skill Agro Internal Warehouse Truck'}</option>
            </select>
          </div>

          <div className="form-group">
            <span className="form-label">{language === 'ar' ? 'اسم السائق / الوكيل' : 'Driver / Agent Name'}</span>
            <input
              type="text"
              className="form-input"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <span className="form-label">{language === 'ar' ? 'إثبات الصرف / رفع سند النقل' : 'Proof of Release / Transport Slip Upload'}</span>
            <div style={{ border: '1px dashed #b8c7b4', padding: '12px', borderRadius: '4px', textAlign: 'center', backgroundColor: '#f8faf8' }}>
              <Upload size={18} style={{ margin: '0 auto 4px auto', color: 'var(--color-forest-dark)' }} />
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-forest-dark)' }}>{slipFile}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{language === 'ar' ? 'تم إنشاء سند الإثبات وتحميله في حالة التوزيع' : 'Proof slip generated & loaded into dispatched position'}</div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>{t('cancel')}</button>
          <button className="btn-primary" onClick={() => onConfirm(item, transporter, driverName)}>
            <Send size={14} />
            <span>{language === 'ar' ? 'إصدار الشحنة وتحديدها قيد النقل' : 'Release Order & Mark In-Transit'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
