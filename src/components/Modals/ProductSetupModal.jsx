import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ProductSetupModal = ({ onClose, onConfirm }) => {
  const { language, t } = useLanguage();
  const [productType, setProductType] = useState('Seeds');
  const [category, setCategory] = useState('Vegetable Seeds');
  const [subCategory, setSubCategory] = useState('Hybrid F1');
  const [nameEn, setNameEn] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [varietyEn, setVarietyEn] = useState('');
  const [varietyAr, setVarietyAr] = useState('');
  const [vendorCode, setVendorCode] = useState('VND-EMIRATES-01');
  const [packSize, setPackSize] = useState('1 kg Can');
  const [price, setPrice] = useState(350);
  const [shelfLifeMonths, setShelfLifeMonths] = useState(18);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameEn) return;
    const generatedSku = `${nameEn.substring(0, 3).toUpperCase()}-${varietyEn.substring(0, 3).toUpperCase() || 'VAR'}-1KG`;
    onConfirm({
      sku: generatedSku,
      productName: nameEn,
      productNameAr: nameAr,
      category,
      subCategory,
      productType,
      packSize,
      vendorCode,
      unitPrice: Number(price),
      shelfLifeMonths: Number(shelfLifeMonths)
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <span className="modal-title">{language === 'ar' ? 'إعداد المنتج وخصائص الرمز (SKU)' : 'Product & SKU Attribute Setup'}</span>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div style={{ backgroundColor: '#f0f4ee', padding: '10px 12px', borderRadius: '4px', fontSize: '11.5px', color: '#1b4332', lineHeight: '1.4', wordBreak: 'break-word' }}>
            <strong>{language === 'ar' ? 'قاعدة النظام:' : 'System Rule:'}</strong> {language === 'ar' ? 'يحدد نوع المنتج قوالب الخصائص (البذور تحمل الصنف، علم الهجين، تاريخ الإنتاج والانتهاء؛ المستلزمات تحمل قالباً مبسطاً).' : 'Product type determines attribute templates (Seeds carry variety, hybrid flag, MFD & expiry; Agriculture Essentials carry reduced template).'}
          </div>

          <div className="modal-form-grid">
            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'نوع المنتج' : 'Product Type'}</span>
              <select className="form-select" value={productType} onChange={(e) => setProductType(e.target.value)}>
                <option value="Seeds">{language === 'ar' ? 'بذور (مجموعة خصائص كاملة مع الصلاحية)' : 'Seeds (Full attribute set with expiry)'}</option>
                <option value="Agriculture Essentials">{language === 'ar' ? 'مستلزمات زراعية (شبك تظليل، مناخل)' : 'Agriculture Essentials (Shade nets, mesh)'}</option>
              </select>
            </div>

            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'كود المورد' : 'Vendor Code'}</span>
              <select className="form-select" value={vendorCode} onChange={(e) => setVendorCode(e.target.value)}>
                <option value="VND-EMIRATES-01">{language === 'ar' ? 'شركة الإمارات للبذور (VND-EMIRATES-01)' : 'Emirates Seed Corp (VND-EMIRATES-01)'}</option>
                <option value="VND-ROYAL-DUTCH">{language === 'ar' ? 'بذور الهولندية الملكية (VND-ROYAL-DUTCH)' : 'Royal Dutch Seeds (VND-ROYAL-DUTCH)'}</option>
                <option value="VND-RIYADH-NETS">{language === 'ar' ? 'شباك الرياض الزراعية (VND-RIYADH-NETS)' : 'Al-Riyadh Agri Nets (VND-RIYADH-NETS)'}</option>
              </select>
            </div>

            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'الفئة' : 'Category'}</span>
              <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Vegetable Seeds">{language === 'ar' ? 'بذور خضروات' : 'Vegetable Seeds'}</option>
                <option value="Agriculture Essentials">{language === 'ar' ? 'مستلزمات زراعية' : 'Agriculture Essentials'}</option>
              </select>
            </div>

            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'الفئة الفرعية' : 'Sub-Category'}</span>
              <select className="form-select" value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
                <option value="Hybrid F1">{language === 'ar' ? 'هجين إف ١ (Hybrid F1)' : 'Hybrid F1'}</option>
                <option value="Open Pollinated">{language === 'ar' ? 'تلقيح مفتوح (Open Pollinated)' : 'Open Pollinated'}</option>
                <option value="Shade Mesh">{language === 'ar' ? 'شبك تظليل (Shade Mesh)' : 'Shade Mesh'}</option>
              </select>
            </div>
          </div>

          <div className="modal-form-grid">
            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'اسم المنتج (بالإنجليزية)' : 'Product Name (English)'}</span>
              <input type="text" className="form-input" placeholder="e.g. Hybrid Tomato Seed" value={nameEn} onChange={(e) => setNameEn(e.target.value)} required />
            </div>

            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'اسم المنتج (بالعربية)' : 'Product Name (Arabic)'}</span>
              <input type="text" className="form-input" placeholder="بذور طماطم هجين" value={nameAr} onChange={(e) => setNameAr(e.target.value)} dir="rtl" />
            </div>

            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'اسم الصنف (بالإنجليزية)' : 'Variety Name (English)'}</span>
              <input type="text" className="form-input" placeholder="e.g. Red Crown F1" value={varietyEn} onChange={(e) => setVarietyEn(e.target.value)} />
            </div>

            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'اسم الصنف (بالعربية)' : 'Variety Name (Arabic)'}</span>
              <input type="text" className="form-input" placeholder="تاج أحمر إف ١" value={varietyAr} onChange={(e) => setVarietyAr(e.target.value)} dir="rtl" />
            </div>
          </div>

          <div className="modal-form-grid">
            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'حجم العبوة' : 'Pack Size'}</span>
              <input type="text" className="form-input" value={packSize} onChange={(e) => setPackSize(e.target.value)} />
            </div>

            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'السعر الأساسي (ريال)' : 'Base Price (SAR)'}</span>
              <input type="number" className="form-input" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>

            <div className="form-group">
              <span className="form-label">{language === 'ar' ? 'مدة الصلاحية الافتراضية (أشهر)' : 'Default Shelf Life (Months)'}</span>
              <input type="number" className="form-input" value={shelfLifeMonths} onChange={(e) => setShelfLifeMonths(e.target.value)} />
            </div>
          </div>

          <div className="modal-footer" style={{ margin: '10px -16px -16px -16px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>{t('cancel')}</button>
            <button type="submit" className="btn-primary">
              <Plus size={14} />
              <span>{language === 'ar' ? 'إنشاء المنتج وتوليد الرمز (SKU)' : 'Create Product & Generate SKU'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
