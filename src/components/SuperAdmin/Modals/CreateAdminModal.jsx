import React, { useState } from 'react';
import { X, ShieldPlus, UserCheck, AlertCircle } from 'lucide-react';
import { useManagerContext } from '../../../context/ManagerContext';
import { useLanguage } from '../../../context/LanguageContext';

export const CreateAdminModal = ({ onClose, onShowToast }) => {
  const { createAdminUser } = useManagerContext();
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    phone: '+966 50 ',
    branchId: 'ALL',
    accessLevel: 'Full Admin',
    permissions: ['PO Approvals', 'Ceiling Modification', 'User Governance', 'Audit Trail']
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePermission = (perm) => {
    if (formData.permissions.includes(perm)) {
      setFormData({ ...formData, permissions: formData.permissions.filter(p => p !== perm) });
    } else {
      setFormData({ ...formData, permissions: [...formData.permissions, perm] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.username) {
      alert(language === 'ar' ? 'يرجى تعبئة جميع الحقول المطلوبة.' : 'Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createAdminUser({
        userName: formData.name,
        role: 'Admin',
        assignedLocation: formData.branchId === 'ALL' ? 'Master Governance Desk' : formData.branchId
      });
      const newAdmin = res?.data || { userName: formData.name, userId: 'USR-ADM-NEW' };
      onShowToast(language === 'ar' ? `تم إنشاء حساب مسؤول لـ ${newAdmin.userName || formData.name} (${formData.accessLevel}). معرف المستخدم: ${newAdmin.userId || 'USR-ADM-NEW'}` : `Created Admin Account for ${newAdmin.userName || formData.name} (${formData.accessLevel}). User ID: ${newAdmin.userId || 'USR-ADM-NEW'}`);
      onClose();
    } catch (err) {
      console.error(err);
      alert(language === 'ar' ? 'فشل إنشاء حساب المسؤول.' : 'Failed to create admin user.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const permLabels = {
    'PO Approvals': language === 'ar' ? 'الموافقة على أوامر الشراء' : 'PO Approvals',
    'Ceiling Modification': language === 'ar' ? 'تعديل سقوف الأسعار والائتمان' : 'Ceiling Modification',
    'User Governance': language === 'ar' ? 'إدارة وحوكمة المستخدمين' : 'User Governance',
    'Audit Trail': language === 'ar' ? 'سجل العمليات والرقابة' : 'Audit Trail',
    'Return Rules': language === 'ar' ? 'قواعد الإرجاع' : 'Return Rules',
    'Vendor Catalog': language === 'ar' ? 'دليل الموردين' : 'Vendor Catalog'
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '580px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header" style={{ backgroundColor: '#1b4332', color: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldPlus size={18} style={{ color: '#4ade80' }} />
            <h3 style={{ margin: 0, fontSize: '15px', color: '#ffffff' }}>{language === 'ar' ? 'تعيين حساب مسؤول جديد (أدمن)' : 'Provision New Admin Account'}</h3>
          </div>
          <button className="modal-close-btn" style={{ color: '#ffffff' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ backgroundColor: '#f4f6f3', border: '1px solid var(--border-color)', padding: '12px 14px', borderRadius: '4px', fontSize: '12px', color: 'var(--text-main)', display: 'flex', gap: '10px' }}>
              <AlertCircle size={16} className="shrink-0 text-emerald-800" style={{ marginTop: '2px' }} />
              <div>
                <strong>{language === 'ar' ? 'صلاحيات المشرف العام:' : 'Super Admin Access Provisioning:'}</strong> {language === 'ar' ? 'سيقوم هذا الإجراء بإنشاء حساب أدمن على مستوى النظام مع حقوق تجاوز إدارية عبر الفروع.' : 'This action will create a system-level Admin account with administrative override rights across selected regional hubs.'}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>{language === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder={language === 'ar' ? 'مثال: طارق الغامدي' : 'e.g. Tariq Al-Ghamdi'}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>{language === 'ar' ? 'اسم المستخدم *' : 'Username *'}</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder={language === 'ar' ? 'مثال: tariq.admin' : 'e.g. tariq.admin'}
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>{language === 'ar' ? 'البريد الإلكتروني للشركة *' : 'Corporate Email *'}</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder={language === 'ar' ? 'مثال: tariq@greenskillagro.sa' : 'e.g. tariq@greenskillagro.sa'}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>{language === 'ar' ? 'رقم الهاتف السعودي' : 'KSA Phone Number'}</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>{language === 'ar' ? 'المستودع المخصص' : 'Assigned Warehouse'}</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={language === 'ar' ? 'مركز التوزيع المركزي بالرياض (WH-01)' : 'Riyadh Central Distribution Center (WH-01)'}
                  disabled
                  style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed', fontSize: '12px', color: '#475569' }}
                />
              </div>

              <div>
                <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>{language === 'ar' ? 'مستوى صلاحية الأدمن' : 'Admin Access Level'}</label>
                <select 
                  className="form-select"
                  value={formData.accessLevel}
                  onChange={(e) => setFormData({ ...formData, accessLevel: e.target.value })}
                >
                  <option value="Full Admin">{language === 'ar' ? 'مسؤول كامل (جميع السقوف وأوامر الشراء)' : 'Full Admin (All Ceilings & POs)'}</option>
                  <option value="Regional Admin">{language === 'ar' ? 'مسؤول إقليمي (نطاق الفرع)' : 'Regional Admin (Branch Scope)'}</option>
                  <option value="Read-only Auditor">{language === 'ar' ? 'مدقق قراءة فقط (حوكمة)' : 'Read-only Auditor (Governance)'}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="form-label" style={{ fontWeight: 600, fontSize: '12px', marginBottom: '8px', display: 'block' }}>
                {language === 'ar' ? 'الصلاحيات الممنوحة للأدمن' : 'Granted Admin Permissions'}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {['PO Approvals', 'Ceiling Modification', 'User Governance', 'Audit Trail', 'Return Rules', 'Vendor Catalog'].map((perm) => (
                  <label key={perm} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', cursor: 'pointer', padding: '6px 10px', backgroundColor: '#f8faf7', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
                    <input 
                      type="checkbox" 
                      checked={formData.permissions.includes(perm)}
                      onChange={() => togglePermission(perm)}
                    />
                    <span>{permLabels[perm] || perm}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-footer" style={{ borderTop: '1px solid var(--border-color)', padding: '14px 20px', display: 'flex', justifyContent: 'flex-end', gap: '10px', backgroundColor: '#fafcf9' }}>
            <button type="button" className="btn-secondary" onClick={onClose} disabled={isSubmitting}>
              {t('cancel')}
            </button>
            <button type="submit" className="btn-primary" style={{ backgroundColor: '#1b4332', borderColor: '#1b4332' }} disabled={isSubmitting}>
              <UserCheck size={14} />
              <span>{isSubmitting ? (language === 'ar' ? 'جاري التعيين...' : 'Provisioning...') : (language === 'ar' ? 'تعيين حساب الأدمن' : 'Provision Admin Account')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
