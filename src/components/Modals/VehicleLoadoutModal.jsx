import React, { useState } from 'react';
import { X, Truck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const VehicleLoadoutModal = ({ onClose, onConfirm }) => {
  const { language, t } = useLanguage();
  const [vehicle, setVehicle] = useState('VH-03 (Hyundai Mighty - Tariq Al-Rashid)');
  const [sku, setSku] = useState('OKRA-PK-5KG');
  const [quantity, setQuantity] = useState(30);
  const [lotNumber, setLotNumber] = useState('OKR-2025-09A (First Expiry Priority)');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({
      vehicle,
      sku,
      quantity: Number(quantity),
      lotNumber
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <span className="modal-title">{language === 'ar' ? 'تخصيص الشاحنة وصرف المخزون للمندوب' : 'Assign Vehicle & Issue Stock to Seller'}</span>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div style={{ backgroundColor: '#f0f4ee', border: '1px solid #c6dec3', padding: '10px 12px', borderRadius: '4px', fontSize: '11.5px', color: '#1b4332', lineHeight: '1.4', wordBreak: 'break-word' }}>
            <strong>{language === 'ar' ? 'قاعدة النظام:' : 'System Rule:'}</strong> {language === 'ar' ? 'تقترح التشغيلات حسب الأقرب انتهاءً (FEFO). يتطلب صرف المخزون التحقق من سقف قيمة مخزون الشاحنة. يجب على المندوب تأكيد الاستلام على جهازه لإتمام النقل.' : 'Batches are proposed First-Expiry-First-Out (FEFO). Issuing stock requires vehicle stock value ceiling validation. The seller must confirm receipt on their device to complete the transfer.'}
          </div>

          <div className="form-group">
            <span className="form-label">{language === 'ar' ? 'تخصيص الشاحنة والمندوب' : 'Vehicle Assignment & Seller'}</span>
            <select className="form-select" value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
              <option value="VH-03 (Hyundai Mighty - Tariq Al-Rashid)">{language === 'ar' ? 'VH-03 (هيونداي مايتي - المندوب: طارق الراشد)' : 'VH-03 (Hyundai Mighty - Seller: Tariq Al-Rashid)'}</option>
              <option value="VH-01 (Toyota Hilux - Omar Farooq)">{language === 'ar' ? 'VH-01 (تويوتا هايلوكس - المندوب: عمر فاروق)' : 'VH-01 (Toyota Hilux - Seller: Omar Farooq)'}</option>
              <option value="VH-04 (Ford Ranger - Faisal Ahmed)">{language === 'ar' ? 'VH-04 (فورد رينجر - المندوب: فيصل أحمد)' : 'VH-04 (Ford Ranger - Seller: Faisal Ahmed)'}</option>
            </select>
          </div>

          <div className="modal-form-grid">
            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'الرمز (SKU) المراد صرفه' : 'SKU to Issue'}</span>
              <select className="form-select" value={sku} onChange={(e) => setSku(e.target.value)}>
                <option value="OKRA-PK-5KG">{language === 'ar' ? 'OKRA-PK-5KG (بذور بامية باربهاني كرانتي 5 كجم)' : 'OKRA-PK-5KG (Okra Seed Parbhani Kranti 5KG)'}</option>
                <option value="TOM-HYB-1KG">{language === 'ar' ? 'TOM-HYB-1KG (طماطم هجين تاج أحمر 1 كجم)' : 'TOM-HYB-1KG (Hybrid Tomato Red Crown F1 1KG)'}</option>
                <option value="CUC-ALP-500G">{language === 'ar' ? 'CUC-ALP-500G (خيار ألفا 500 جرام)' : 'CUC-ALP-500G (Cucumber Alpha F1 500g)'}</option>
              </select>
            </div>

            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'التشغيلة المقترحة (الأقرب انتهاءً FEFO)' : 'Proposed Batch (FEFO First)'}</span>
              <select className="form-select" value={lotNumber} onChange={(e) => setLotNumber(e.target.value)}>
                <option value="OKR-2025-09A (First Expiry Priority)">{language === 'ar' ? 'تشغيلة: OKR-2025-09A (الانتهاء: 2026-09-30) [أولوية FEFO]' : 'LOT: OKR-2025-09A (Exp: 2026-09-30) [FEFO Priority]'}</option>
                <option value="OKR-2026-01B (Standard)">{language === 'ar' ? 'تشغيلة: OKR-2026-01B (الانتهاء: 2027-04-15)' : 'LOT: OKR-2026-01B (Exp: 2027-04-15)'}</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <span className="form-label">{language === 'ar' ? 'الكمية المراد صرفها' : 'Quantity to Issue'}</span>
            <input type="number" className="form-input" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>

          <div className="modal-footer" style={{ margin: '10px -16px -16px -16px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>{t('cancel')}</button>
            <button type="submit" className="btn-primary">
              <Truck size={14} />
              <span>{language === 'ar' ? 'صرف المخزون وإشعار المندوب لاستلام الشحنة' : 'Issue Stock & Notify Seller for Handover Receipt'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
