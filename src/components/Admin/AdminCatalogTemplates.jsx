import React, { useState } from 'react';
import { Tag, Plus, Search, CheckCircle } from 'lucide-react';
import { PRODUCT_CATEGORIES_DATA } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';

export const AdminCatalogTemplates = ({ onShowToast }) => {
  const { language, t } = useLanguage();
  const [categories, setCategories] = useState([...PRODUCT_CATEGORIES_DATA]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    categoryName: '',
    codePrefix: '',
    defaultUom: '1KG Pack',
    taxRatePct: 15,
    fefoPolicy: 'Strict 30-Day FEFO Clearance'
  });

  const filteredCategories = categories.filter(c => 
    c.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.codePrefix.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.categoryName || !newCategory.codePrefix) return;
    const catObj = {
      categoryId: `CAT-0${categories.length + 1}`,
      categoryName: newCategory.categoryName,
      codePrefix: newCategory.codePrefix.toUpperCase(),
      defaultUom: newCategory.defaultUom,
      taxRatePct: Number(newCategory.taxRatePct),
      skusCount: 0,
      fefoPolicy: newCategory.fefoPolicy,
      status: language === 'ar' ? 'فئة رئيسية نشطة' : 'Active Master Category'
    };
    setCategories(prev => [...prev, catObj]);
    setModalOpen(false);
    setNewCategory({ categoryName: '', codePrefix: '', defaultUom: '1KG Pack', taxRatePct: 15, fefoPolicy: 'Strict 30-Day FEFO Clearance' });
    if (onShowToast) {
      onShowToast(language === 'ar' ? `تم إنشاء فئة المنتجات "${catObj.categoryName}" (البادئة: ${catObj.codePrefix})` : `Created Product Category "${catObj.categoryName}" (Prefix: ${catObj.codePrefix})`);
    }
  };

  return (
    <div className="admin-page-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="data-panel" style={{ minHeight: 'auto' }}>
        <div className="panel-header-toolbar">
          <div className="panel-main-title">
            <Tag size={16} />
            <span>{language === 'ar' ? 'إعداد قوالب أنواع المنتجات والفئات الرئيسية' : 'Product Type Templates & Master Categories Setup'}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="pos-search-box" style={{ width: '220px' }}>
              <Search size={14} className="pos-search-icon" />
              <input 
                type="text" 
                className="form-input pos-search-input" 
                placeholder={language === 'ar' ? 'ابحث عن فئة أو كود...' : 'Search category or prefix...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button className="btn-primary" onClick={() => setModalOpen(true)} style={{ gap: '6px' }}>
              <Plus size={14} />
              <span>{language === 'ar' ? '+ إضافة فئة منتج' : '+ Add Product Category'}</span>
            </button>
          </div>
        </div>

        <div className="erp-table-wrapper">
          <table className="erp-table">
            <thead>
              <tr>
                <th>{language === 'ar' ? 'معرف الفئة' : 'Category ID'}</th>
                <th>{language === 'ar' ? 'اسم الفئة' : 'Category Name'}</th>
                <th>{language === 'ar' ? 'بادئة الكود' : 'Code Prefix'}</th>
                <th>{language === 'ar' ? 'وحدة القياس الافتراضية' : 'Default UOM'}</th>
                <th>{language === 'ar' ? 'نسبة ضريبة القيمة المضافة' : 'VAT Tax Rate'}</th>
                <th>{language === 'ar' ? 'الأصناف النشطة' : 'Active SKUs'}</th>
                <th>{language === 'ar' ? 'سياسة FEFO / التخزين' : 'FEFO / Warehousing Policy'}</th>
                <th>{language === 'ar' ? 'الحالة' : 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((c) => (
                <tr key={c.categoryId}>
                  <td><span className="code-cell">{c.categoryId}</span></td>
                  <td><div style={{ fontWeight: 600, color: 'var(--color-forest-dark)' }}>{c.categoryName}</div></td>
                  <td><span className="code-cell">{c.codePrefix}</span></td>
                  <td>{c.defaultUom}</td>
                  <td><strong>{c.taxRatePct}% VAT</strong></td>
                  <td><span className="badge badge-info">{c.skusCount} SKUs</span></td>
                  <td style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{c.fefoPolicy}</td>
                  <td>
                    <span className="badge badge-success">
                      <CheckCircle size={11} />
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Product Category */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" style={{ width: '480px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-forest-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Tag size={16} />
                <span>{language === 'ar' ? 'إضافة فئة منتج رئيسية جديدة' : 'Add Master Product Category'}</span>
              </div>
            </div>

            <form onSubmit={handleAddCategory}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>{language === 'ar' ? 'اسم الفئة' : 'Category Name'}</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder={language === 'ar' ? 'مثال: محفزات المحاصيل العضوية' : 'e.g. Organic Crop Boosters'}
                    value={newCategory.categoryName}
                    onChange={(e) => setNewCategory({ ...newCategory, categoryName: e.target.value })}
                    required
                  />
                </div>

                <div className="modal-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>{language === 'ar' ? 'بادئة كود SKU' : 'SKU Code Prefix'}</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder={language === 'ar' ? 'مثال: ORG-BOOST' : 'e.g. ORG-BOOST'}
                      value={newCategory.codePrefix}
                      onChange={(e) => setNewCategory({ ...newCategory, codePrefix: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>{language === 'ar' ? 'وحدة القياس الافتراضية' : 'Default Unit of Measure'}</label>
                    <select 
                      className="form-select"
                      value={newCategory.defaultUom}
                      onChange={(e) => setNewCategory({ ...newCategory, defaultUom: e.target.value })}
                    >
                      <option value="1KG Pack">{language === 'ar' ? 'عبوة 1 كجم' : '1KG Pack'}</option>
                      <option value="5KG Bag">{language === 'ar' ? 'كيس 5 كجم' : '5KG Bag'}</option>
                      <option value="Roll (50m)">{language === 'ar' ? 'لفة (50 متر)' : 'Roll (50m)'}</option>
                      <option value="5L Canister">{language === 'ar' ? 'جالون 5 لتر' : '5L Canister'}</option>
                      <option value="25KG SACK">{language === 'ar' ? 'كيس 25 كجم' : '25KG SACK'}</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>{language === 'ar' ? 'سياسة FEFO / التخزين بالمستودع' : 'Warehousing FEFO Policy'}</label>
                  <select 
                    className="form-select"
                    value={newCategory.fefoPolicy}
                    onChange={(e) => setNewCategory({ ...newCategory, fefoPolicy: e.target.value })}
                  >
                    <option value="Strict 30-Day FEFO Clearance">{language === 'ar' ? 'تصفية FEFO صارمة (30 يوماً)' : 'Strict 30-Day FEFO Clearance'}</option>
                    <option value="Standard FIFO Warehousing">{language === 'ar' ? 'تخزين قياسي (الوارد أولاً يخرج أولاً FIFO)' : 'Standard FIFO Warehousing'}</option>
                    <option value="Batch Expiry Tracked">{language === 'ar' ? 'تتبع تاريخ انتهاء التشغيلة' : 'Batch Expiry Tracked'}</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>{t('cancel')}</button>
                <button type="submit" className="btn-primary">{language === 'ar' ? 'إنشاء الفئة' : 'Create Category'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
