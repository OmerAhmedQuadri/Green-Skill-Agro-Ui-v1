import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Truck, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle2,
  Edit
} from 'lucide-react';
import { useManagerContext } from '../../context/ManagerContext';
import { useLanguage } from '../../context/LanguageContext';
import { EditBranchModal } from './Modals/EditBranchModal';

export const SuperAdminBranchManager = ({ onShowToast }) => {
  const { branches = [], updateBranchStatus, updateBranchDetails } = useManagerContext();
  const { language, t } = useLanguage();
  const [editModal, setEditModal] = useState({ open: false, branch: null });

  const activeCount = (branches || []).filter(b => (b.status || 'Active Hub') === 'Active Hub').length;
  const maintCount = (branches || []).filter(b => b.status === 'Maintenance Mode').length;

  const handleBranchStatusToggle = async (branch) => {
    const bId = branch.branchId || branch.id;
    const bName = branch.branchName || branch.name || bId;
    const currentStatus = branch.status || 'Active Hub';
    const nextStatus = currentStatus === 'Maintenance Mode' ? 'Active Hub' : 'Maintenance Mode';
    await updateBranchStatus(bId, nextStatus);
    onShowToast(language === 'ar' ? `تم تحديث حالة المستودع ${bName} (${bId}) إلى ${nextStatus === 'Maintenance Mode' ? 'وضع الصيانة' : 'مستودع نشط'}.` : `Branch ${bName} (${bId}) status updated to ${nextStatus}.`);
  };

  const handleSaveBranchDetails = async (branchId, updatedData) => {
    setEditModal({ open: false, branch: null });
    await updateBranchDetails(branchId, updatedData);
    onShowToast(language === 'ar' ? `تم تحديث الإعدادات التشغيلية لـ ${updatedData.branchName || branchId}.` : `Updated operational parameters for ${updatedData.branchName || branchId}.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Banner */}
      <div className="panel-card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--color-forest-dark)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={18} className="text-emerald-800" />
              <span>{language === 'ar' ? 'إدارة عمليات المستودع المركزي (WH-01)' : 'Phase 1 Central Warehouse Operations Management'}</span>
            </h3>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {language === 'ar' ? 'متابعة وإدارة مركز التوزيع المركزي الرئيسي بالرياض (WH-01)، تخصيص مدير المستودع، تقييم المخزون، وحالة التشغيل.' : 'Oversee the primary Phase 1 Central Distribution Center (WH-01), warehouse manager allocation, inventory valuation, and operational status.'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="badge badge-success" style={{ padding: '6px 12px', fontSize: '12px' }}>
              <CheckCircle2 size={13} /> {activeCount > 0 ? 1 : 0} {language === 'ar' ? 'مستودع مركزي نشط' : 'Central Warehouse Active'}
            </span>
            {maintCount > 0 && (
              <span className="badge badge-danger" style={{ padding: '6px 12px', fontSize: '12px', backgroundColor: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' }}>
                <ShieldAlert size={13} /> {language === 'ar' ? 'مستودع في وضع الصيانة' : 'Warehouse in Maintenance'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Single Central Warehouse Card (Phase 1) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        {(branches || []).filter(b => (b.branchId || b.id || 'WH-01') === 'WH-01').map((b) => {
          const bId = b.branchId || b.id || 'WH-01';
          const bName = b.branchName || b.name || (language === 'ar' ? 'مركز التوزيع المركزي بالرياض' : 'Riyadh Central Distribution Center');
          const bRegion = b.region || b.city || (language === 'ar' ? 'المنطقة المركزية (الرياض)' : 'Central Region (Riyadh)');
          const bManager = b.manager || (language === 'ar' ? 'سامي المنصور' : 'Sami Al-Mansoor');
          const bSellers = b.activeSellersCount || b.sellersCount || 4;
          const bStock = b.inventoryValue ? (b.inventoryValue / 1000).toFixed(0) : 1420;
          const bRevenue = b.dailyTargetSales ? b.dailyTargetSales * 30 : 4500000;
          const bStatus = b.status || 'Active Hub';

          return (
            <div key={bId} className="panel-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', fontWeight: 700 }}>
                      {language === 'ar' ? 'معرف المستودع المركزي:' : 'Central Warehouse ID:'} {bId}
                    </div>
                    <h4 style={{ margin: '2px 0 0 0', fontSize: '18px', fontWeight: 800, color: 'var(--color-forest-dark)' }}>
                      {language === 'ar' ? 'مركز التوزيع المركزي بالرياض (WH-01)' : bName}
                    </h4>
                    <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {bRegion}, {language === 'ar' ? 'المملكة العربية السعودية' : 'Kingdom of Saudi Arabia'}
                    </div>
                  </div>

                  {bStatus === 'Maintenance Mode' ? (
                    <span className="badge badge-danger" style={{ fontSize: '12px', padding: '5px 10px', backgroundColor: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' }}>
                      ⚠️ {t('maintenanceMode')}
                    </span>
                  ) : (
                    <span className="badge badge-success" style={{ fontSize: '12px', padding: '5px 10px' }}>
                      {t('activeHub')}
                    </span>
                  )}
                </div>

                {/* Branch Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', backgroundColor: '#f8faf7', padding: '16px', borderRadius: '6px', border: '1px solid var(--border-color)', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Users size={13} /> {language === 'ar' ? 'مدير المستودع' : 'Warehouse Manager'}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginTop: '3px' }}>
                      {bManager}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Truck size={13} /> {language === 'ar' ? 'مندوبي الشاحنات النشطين' : 'Active Van Sellers'}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginTop: '3px' }}>
                      {bSellers} {language === 'ar' ? 'شاحنات مخصصة' : 'Vans Assigned'}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Building2 size={13} /> {language === 'ar' ? 'قيمة المخزون الإجمالية' : 'Inventory Stock Value'}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginTop: '3px' }}>
                      {language === 'ar' ? `${bStock} ألف ريال` : `SAR ${bStock}k`}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>{language === 'ar' ? 'هدف مبيعات الشهر المطلوب' : 'Monthly Target Sales Revenue'}</span>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: '#1b4332', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <TrendingUp size={16} className="text-emerald-700" />
                    {language === 'ar' ? `${bRevenue.toLocaleString()} ريال` : `SAR ${bRevenue.toLocaleString()}`}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px', paddingTop: '14px', borderTop: '1px dashed var(--border-color)' }}>
                <button 
                  className="btn-secondary" 
                  style={{ fontSize: '12.5px', padding: '7px 14px' }}
                  onClick={() => setEditModal({ open: true, branch: b })}
                >
                  <Edit size={14} />
                  <span>{language === 'ar' ? 'تعديل تفاصيل المستودع' : 'Edit Warehouse Details'}</span>
                </button>

                <button 
                  className={bStatus === 'Maintenance Mode' ? 'btn-primary' : 'btn-secondary'}
                  style={{ 
                    fontSize: '12.5px', 
                    padding: '7px 14px',
                    ...(bStatus === 'Active Hub' ? { color: '#991b1b', borderColor: '#fecaca' } : {})
                  }}
                  onClick={() => handleBranchStatusToggle(b)}
                >
                  {bStatus === 'Maintenance Mode' ? <CheckCircle2 size={14} /> : <ShieldAlert size={14} />}
                  <span>{bStatus === 'Maintenance Mode' ? (language === 'ar' ? 'تنشيط المستودع' : 'Activate Warehouse') : (language === 'ar' ? 'وضع الصيانة' : 'Maintenance Mode')}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {editModal.open && (
        <EditBranchModal
          branch={editModal.branch}
          onClose={() => setEditModal({ open: false, branch: null })}
          onConfirm={handleSaveBranchDetails}
        />
      )}
    </div>
  );
};
