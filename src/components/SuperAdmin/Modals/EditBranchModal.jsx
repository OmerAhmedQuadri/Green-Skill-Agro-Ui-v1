import React, { useState } from 'react';
import { X, Building2, Save } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

export const EditBranchModal = ({ branch, onClose, onConfirm }) => {
  const { language, t } = useLanguage();
  const [branchName, setBranchName] = useState(branch?.branchName || branch?.name || '');
  const [region, setRegion] = useState(branch?.region || branch?.city || '');
  const [manager, setManager] = useState(branch?.manager || '');
  const [activeSellersCount, setActiveSellersCount] = useState(branch?.activeSellersCount || 2);
  const [inventoryValue, setInventoryValue] = useState(branch?.inventoryValue || 1000000);
  const [dailyTargetSales, setDailyTargetSales] = useState(branch?.dailyTargetSales || 100000);
  const [status, setStatus] = useState(branch?.status || 'Active Hub');

  if (!branch) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(branch.branchId || branch.id, {
      branchName,
      region,
      manager,
      activeSellersCount: Number(activeSellersCount),
      inventoryValue: Number(inventoryValue),
      dailyTargetSales: Number(dailyTargetSales),
      status
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={18} style={{ color: '#fff' }} />
            <div>
              <span className="modal-title" style={{ fontSize: '15px' }}>{language === 'ar' ? 'تعديل عمليات المستودع — ' : 'Edit Branch Operations — '}{branch.branchId || branch.id}</span>
              <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.75)' }}>{branch.branchName}</div>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div style={{ backgroundColor: '#f0f4ee', border: '1px solid #c6dec3', padding: '10px 12px', borderRadius: '4px', fontSize: '11.5px', color: '#1b4332', lineHeight: '1.4' }}>
            <strong>{language === 'ar' ? 'حوكمة المشرف العام:' : 'Super Admin Governance:'}</strong> {language === 'ar' ? 'تعديل المواصفات الرئيسية للفرع، مدير المستودع المعين، مقاييس المبيعات المستهدفة، وحالة تشغيل المستودع.' : 'Modify master branch specifications, assigned warehouse manager, target sales metrics, and operational hub status.'}
          </div>

          <div className="modal-form-grid">
            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'اسم المستودع / مركز التوزيع' : 'Branch / Distribution Center Name'}</span>
              <input 
                type="text" 
                className="form-input" 
                value={branchName} 
                onChange={(e) => setBranchName(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'المنطقة / المدينة' : 'Region / Province'}</span>
              <input 
                type="text" 
                className="form-input" 
                value={region} 
                onChange={(e) => setRegion(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="modal-form-grid">
            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'مدير المستودع المعين' : 'Assigned Branch Manager'}</span>
              <select className="form-select" value={manager} onChange={(e) => setManager(e.target.value)}>
                <option value="Sami Al-Mansoor">{language === 'ar' ? 'سامي المنصور (مستودع الرياض WH-01)' : 'Sami Al-Mansoor (Riyadh WH-01)'}</option>
                <option value="Tariq Al-Rashid">{language === 'ar' ? 'طارق الراشد (مستودع القصيم WH-02)' : 'Tariq Al-Rashid (Al-Qassim WH-02)'}</option>
                <option value="Fahad Al-Zahrani">{language === 'ar' ? 'فهد الزهراني (مستودع الدمام WH-03)' : 'Fahad Al-Zahrani (Dammam WH-03)'}</option>
                <option value="Youssef Al-Qarni">{language === 'ar' ? 'يوسف القرني (مستودع أبها WH-04)' : 'Youssef Al-Qarni (Abha WH-04)'}</option>
              </select>
            </div>

            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'عدد مندوبي الشاحنات النشطين' : 'Active Van Sellers Count'}</span>
              <input 
                type="number" 
                className="form-input" 
                value={activeSellersCount} 
                onChange={(e) => setActiveSellersCount(e.target.value)} 
                min={0}
              />
            </div>
          </div>

          <div className="modal-form-grid">
            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'قيمة موقع المخزون (ريال سعودي)' : 'Inventory Stock Position (SAR)'}</span>
              <input 
                type="number" 
                className="form-input" 
                value={inventoryValue} 
                onChange={(e) => setInventoryValue(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'هدف المبيعات اليومي (ريال سعودي)' : 'Daily Sales Target (SAR)'}</span>
              <input 
                type="number" 
                className="form-input" 
                value={dailyTargetSales} 
                onChange={(e) => setDailyTargetSales(e.target.value)} 
              />
            </div>
          </div>

          <div className="form-group">
            <span className="form-label">{language === 'ar' ? 'حالة تشغيل المستودع' : 'Operational Hub Status'}</span>
            <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Active Hub">{language === 'ar' ? 'مستودع نشط (عمليات طبيعية)' : 'Active Hub (Normal Operations)'}</option>
              <option value="Maintenance Mode">{language === 'ar' ? 'وضع الصيانة (توقف مؤقت للعمليات / صيانة)' : 'Maintenance Mode (Operations Paused / Maintenance)'}</option>
            </select>
          </div>

          <div className="modal-footer" style={{ margin: '10px -16px -16px -16px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>{t('cancel')}</button>
            <button type="submit" className="btn-primary">
              <Save size={14} />
              <span>{language === 'ar' ? 'حفظ مواصفات المستودع' : 'Save Branch Specifications'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
