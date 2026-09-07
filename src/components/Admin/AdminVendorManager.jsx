import React, { useState } from 'react';
import { Building2, Plus, FileText, Check, ShieldCheck, X } from 'lucide-react';
import { useManagerContext } from '../../context/ManagerContext';
import { useLanguage } from '../../context/LanguageContext';

export const AdminVendorManager = ({ onShowToast }) => {
  const { language, t } = useLanguage();
  const { orders, vendors = [], approvePurchaseOrder, addVendor } = useManagerContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [newVendor, setNewVendor] = useState({
    vendorName: '',
    taxNumber: '',
    category: 'Seeds & Hybrids',
    paymentTerms: '30 Days Net',
    contactPerson: '',
    phone: '',
    email: ''
  });

  const draftPOs = (orders || []).filter(po => 
    (po.stateName || '').toLowerCase().includes('draft') || 
    (po.stateName || '').toLowerCase().includes('pending') ||
    (po.adminApprovalStatus || '').toLowerCase().includes('awaiting')
  );

  const handleApprovePo = async (poNumber) => {
    await approvePurchaseOrder(poNumber);
    if (onShowToast) {
      onShowToast(language === 'ar' ? `تم منح الاعتماد النهائي من الأدمن لأمر الشراء ${poNumber}. تحدثت الحالة إلى "معتمد ومصدر".` : `Final Admin Approval granted for Purchase Order ${poNumber}. PO status updated to "Approved & Issued".`);
    }
  };

  const handleAddVendor = async (e) => {
    e.preventDefault();
    if (!newVendor.vendorName || !newVendor.taxNumber) return;
    const vendorObj = {
      vendorCode: `VND-${newVendor.vendorName.substring(0, 5).toUpperCase()}`,
      vendorName: newVendor.vendorName,
      taxNumber: newVendor.taxNumber,
      category: newVendor.category,
      paymentTerms: newVendor.paymentTerms,
      contactPerson: newVendor.contactPerson || (language === 'ar' ? 'مكتب المشتريات' : 'Procurement Desk'),
      phone: newVendor.phone || '+966 50 000 0000',
      email: newVendor.email || 'vendor@agri.com.sa',
      status: language === 'ar' ? 'مورد معتمد نشط' : 'Active Authorized Vendor',
      activePOsCount: 0
    };
    await addVendor(vendorObj);
    setModalOpen(false);
    setNewVendor({ vendorName: '', taxNumber: '', category: 'Seeds & Hybrids', paymentTerms: '30 Days Net', contactPerson: '', phone: '', email: '' });
    if (onShowToast) {
      onShowToast(language === 'ar' ? `تم تسجيل المورد الرئيسي "${vendorObj.vendorName}" (${vendorObj.vendorCode})` : `Registered Master Vendor "${vendorObj.vendorName}" (${vendorObj.vendorCode})`);
    }
  };

  return (
    <div className="admin-page-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* SECTION 1: Manager Draft PO Approval Queue */}
      <div className="queue-section">
        <div className="queue-header">
          <div className="queue-title-group">
            <FileText size={16} style={{ color: 'var(--color-forest-dark)' }} />
            <span className="queue-title">{language === 'ar' ? 'قائمة الاعتماد النهائي لمسودات أوامر الشراء للمدير' : 'Manager Draft PO Final Approval Queue'}</span>
          </div>
          <span className="tab-count urgent">{draftPOs.length} {language === 'ar' ? 'قيد مراجعة الأدمن' : 'Pending Admin Review'}</span>
        </div>

        <div className="queue-content-body">
          {draftPOs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '16px', color: 'var(--text-muted)', fontSize: '12.5px' }}>
              {language === 'ar' ? 'لا توجد مسودات أوامر شراء قيد انتظار موافقة الأدمن. تم إنجاز جميع طلبات المشتريات.' : 'No draft purchase orders pending Admin approval. All procurement requests processed.'}
            </div>
          ) : (
            <div className="approval-list">
              {draftPOs.map((po) => (
                <div key={po.poNumber} className="approval-card">
                  <div className="approval-left">
                    <div className="approval-icon">
                      <FileText size={16} />
                    </div>
                    <div className="approval-info">
                      <div className="approval-headline">
                        <span>{po.poNumber}</span>
                        <span className="badge badge-warning">{po.stateName}</span>
                      </div>
                      <div className="approval-subtext">
                        {language === 'ar' ? 'المورد:' : 'Vendor:'} <strong>{po.vendorName}</strong> ({po.vendorCode}) &bull; {language === 'ar' ? 'حرر بتاريخ' : 'Raised on'} {po.dateRaised} &bull; {language === 'ar' ? 'مدة التوريد:' : 'Lead Time:'} {po.leadTimeDays} {language === 'ar' ? 'يوماً' : 'days'}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-forest-dark)', fontWeight: 600, marginTop: '2px' }}>
                        {language === 'ar' ? 'ملخص الطلب:' : 'Order Summary:'} {po.itemsSummary} &bull; {language === 'ar' ? 'القيمة الإجمالية:' : 'Total Value:'} <strong>{language === 'ar' ? `${po.totalValue?.toLocaleString()} ريال` : `SAR ${po.totalValue?.toLocaleString()}`}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="approval-actions">
                    <button className="btn-sm-primary" onClick={() => handleApprovePo(po.poNumber)}>
                      <Check size={12} />
                      <span>{language === 'ar' ? 'اعتماد وإصدار أمر الشراء' : 'Approve & Issue PO'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: Master Vendor Directory */}
      <div className="data-panel" style={{ minHeight: 'auto' }}>
        <div className="panel-header-toolbar">
          <div className="panel-main-title">
            <Building2 size={16} />
            <span>{language === 'ar' ? 'دليل الموردين المعتمدين والسجلات الضريبية' : 'Authorized Vendor Directory & Tax Records'}</span>
          </div>

          <button className="btn-primary" onClick={() => setModalOpen(true)} style={{ gap: '6px' }}>
            <Plus size={14} />
            <span>{language === 'ar' ? '+ إضافة مورد رئيسي' : '+ Add Master Vendor'}</span>
          </button>
        </div>

        <div className="erp-table-wrapper">
          <table className="erp-table">
            <thead>
              <tr>
                <th>{language === 'ar' ? 'كود المورد' : 'Vendor Code'}</th>
                <th>{language === 'ar' ? 'اسم المورد' : 'Vendor Name'}</th>
                <th>{language === 'ar' ? 'الرقم الضريبي VAT' : 'VAT Tax ID'}</th>
                <th>{language === 'ar' ? 'الفئة' : 'Category'}</th>
                <th>{language === 'ar' ? 'شروط الدفع' : 'Payment Terms'}</th>
                <th>{language === 'ar' ? 'الشخص المسؤول' : 'Contact Person'}</th>
                <th>{language === 'ar' ? 'رقم التواصل' : 'Contact Phone'}</th>
                <th>{language === 'ar' ? 'أوامر الشراء النشطة' : 'Active POs'}</th>
                <th>{language === 'ar' ? 'الحالة' : 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((v) => (
                <tr key={v.vendorCode}>
                  <td><span className="code-cell">{v.vendorCode}</span></td>
                  <td><div style={{ fontWeight: 600, color: 'var(--color-forest-dark)' }}>{v.vendorName}</div></td>
                  <td><span className="code-cell" style={{ fontSize: '11px' }}>{v.taxNumber}</span></td>
                  <td>{v.category}</td>
                  <td><strong>{v.paymentTerms}</strong></td>
                  <td>{v.contactPerson}</td>
                  <td style={{ fontSize: '11.5px' }}>{v.phone}</td>
                  <td><span className="badge badge-info">{v.activePOsCount || 0} {language === 'ar' ? 'نشط' : 'Active'}</span></td>
                  <td>
                    <span className="badge badge-success">
                      <ShieldCheck size={11} />
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Vendor */}
      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal-container" style={{ maxWidth: '520px' }}>
            <div className="modal-header" style={{ backgroundColor: '#1b4332', color: '#ffffff' }}>
              <div style={{ fontWeight: 700, fontSize: '14px', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Building2 size={16} />
                <span>{language === 'ar' ? 'تسجيل ملف مورد رئيسي جديد' : 'Register Master Vendor Profile'}</span>
              </div>
              <button className="modal-close-btn" style={{ color: '#ffffff' }} onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddVendor}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>{language === 'ar' ? 'اسم المنشأة / المورد *' : 'Vendor Business Name *'}</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder={language === 'ar' ? 'مثال: شركة مدخلات الرياض الزراعية' : 'e.g. Al-Riyadh Agri Inputs Ltd'}
                    value={newVendor.vendorName}
                    onChange={(e) => setNewVendor({ ...newVendor, vendorName: e.target.value })}
                    required
                  />
                </div>

                <div className="modal-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>{language === 'ar' ? 'الرقم الضريبي / السجل التجاري *' : 'VAT Tax ID / Commercial Reg. *'}</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. 310492049100003"
                      value={newVendor.taxNumber}
                      onChange={(e) => setNewVendor({ ...newVendor, taxNumber: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>{language === 'ar' ? 'الفئة الرئيسية' : 'Primary Category'}</label>
                    <select 
                      className="form-select"
                      value={newVendor.category}
                      onChange={(e) => setNewVendor({ ...newVendor, category: e.target.value })}
                    >
                      <option value="Hybrid Seeds">{language === 'ar' ? 'بذور هجينة' : 'Hybrid Seeds'}</option>
                      <option value="Shade Nets & Protective MESH">{language === 'ar' ? 'شبك تظليل ومناخل حماية' : 'Shade Nets & Protective MESH'}</option>
                      <option value="Imported Vegetable Seeds">{language === 'ar' ? 'بذور خضروات مستوردة' : 'Imported Vegetable Seeds'}</option>
                      <option value="Agro Chemicals & Fertilizer">{language === 'ar' ? 'كيماويات زراعية وأسمدة' : 'Agro Chemicals & Fertilizer'}</option>
                    </select>
                  </div>
                </div>

                <div className="modal-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>{language === 'ar' ? 'شروط السداد' : 'Payment Terms'}</label>
                    <select 
                      className="form-select"
                      value={newVendor.paymentTerms}
                      onChange={(e) => setNewVendor({ ...newVendor, paymentTerms: e.target.value })}
                    >
                      <option value="15 Days Net">{language === 'ar' ? 'صافي 15 يوماً' : '15 Days Net'}</option>
                      <option value="30 Days Net">{language === 'ar' ? 'صافي 30 يوماً' : '30 Days Net'}</option>
                      <option value="45 Days Net">{language === 'ar' ? 'صافي 45 يوماً' : '45 Days Net'}</option>
                      <option value="Letter of Credit (LC)">{language === 'ar' ? 'اعتماد مستندي (LC)' : 'Letter of Credit (LC)'}</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>{language === 'ar' ? 'اسم الشخص المسؤول' : 'Contact Person Name'}</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder={language === 'ar' ? 'مثال: يوسف الزهراني' : 'e.g. Youssef Al-Zahrani'}
                      value={newVendor.contactPerson}
                      onChange={(e) => setNewVendor({ ...newVendor, contactPerson: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer" style={{ padding: '14px 20px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '10px', backgroundColor: '#fafcf9' }}>
                <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>{t('cancel')}</button>
                <button type="submit" className="btn-primary" style={{ backgroundColor: '#1b4332', borderColor: '#1b4332' }}>{language === 'ar' ? 'حفظ ملف المورد' : 'Save Vendor Profile'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
