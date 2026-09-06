import React, { useState } from 'react';
import { Building2, Plus, FileText, Check, ShieldCheck } from 'lucide-react';
import { VENDORS_MASTER_DATA } from '../../data/mockData';
import { useManagerContext } from '../../context/ManagerContext';

export const AdminVendorManager = ({ onShowToast }) => {
  const { orders, approvePurchaseOrder } = useManagerContext();
  const [vendors, setVendors] = useState([...VENDORS_MASTER_DATA]);
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
      onShowToast(`Final Admin Approval granted for Purchase Order ${poNumber}. PO status updated to "Approved & Issued".`);
    }
  };

  const handleAddVendor = (e) => {
    e.preventDefault();
    if (!newVendor.vendorName || !newVendor.taxNumber) return;
    const vendorObj = {
      vendorCode: `VND-${newVendor.vendorName.substring(0, 5).toUpperCase()}`,
      vendorName: newVendor.vendorName,
      taxNumber: newVendor.taxNumber,
      category: newVendor.category,
      paymentTerms: newVendor.paymentTerms,
      contactPerson: newVendor.contactPerson || 'Procurement Desk',
      phone: newVendor.phone || '+966 50 000 0000',
      email: newVendor.email || 'vendor@agri.com.sa',
      status: 'Active Authorized Vendor',
      activePOsCount: 0
    };
    setVendors(prev => [...prev, vendorObj]);
    setModalOpen(false);
    setNewVendor({ vendorName: '', taxNumber: '', category: 'Seeds & Hybrids', paymentTerms: '30 Days Net', contactPerson: '', phone: '', email: '' });
    if (onShowToast) {
      onShowToast(`Registered Master Vendor "${vendorObj.vendorName}" (${vendorObj.vendorCode})`);
    }
  };

  return (
    <div className="admin-page-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* SECTION 1: Manager Draft PO Approval Queue */}
      <div className="queue-section">
        <div className="queue-header">
          <div className="queue-title-group">
            <FileText size={16} style={{ color: 'var(--color-forest-dark)' }} />
            <span className="queue-title">Manager Draft PO Final Approval Queue</span>
          </div>
          <span className="tab-count urgent">{draftPOs.length} Pending Admin Review</span>
        </div>

        <div className="queue-content-body">
          {draftPOs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '16px', color: 'var(--text-muted)', fontSize: '12.5px' }}>
              No draft purchase orders pending Admin approval. All procurement requests processed.
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
                        Vendor: <strong>{po.vendorName}</strong> ({po.vendorCode}) &bull; Raised on {po.dateRaised} &bull; Lead Time: {po.leadTimeDays} days
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-forest-dark)', fontWeight: 600, marginTop: '2px' }}>
                        Order Summary: {po.itemsSummary} &bull; Total Value: <strong>SAR {po.totalValue?.toLocaleString()}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="approval-actions">
                    <button className="btn-sm-primary" onClick={() => handleApprovePo(po.poNumber)}>
                      <Check size={12} />
                      <span>Approve & Issue PO</span>
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
            <span>Authorized Vendor Directory & Tax Records</span>
          </div>

          <button className="btn-primary" onClick={() => setModalOpen(true)} style={{ gap: '6px' }}>
            <Plus size={14} />
            <span>+ Add Master Vendor</span>
          </button>
        </div>

        <div className="erp-table-wrapper">
          <table className="erp-table">
            <thead>
              <tr>
                <th>Vendor Code</th>
                <th>Vendor Name</th>
                <th>VAT Tax ID</th>
                <th>Category</th>
                <th>Payment Terms</th>
                <th>Contact Person</th>
                <th>Contact Phone</th>
                <th>Active POs</th>
                <th>Status</th>
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
                  <td><span className="badge badge-info">{v.activePOsCount} Active</span></td>
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
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" style={{ width: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-forest-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Building2 size={16} />
                <span>Register Master Vendor Profile</span>
              </div>
            </div>

            <form onSubmit={handleAddVendor}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>Vendor Business Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Al-Riyadh Agri Inputs Ltd"
                    value={newVendor.vendorName}
                    onChange={(e) => setNewVendor({ ...newVendor, vendorName: e.target.value })}
                    required
                  />
                </div>

                <div className="modal-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>VAT Tax ID / Commercial Reg.</label>
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
                    <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>Primary Category</label>
                    <select 
                      className="form-select"
                      value={newVendor.category}
                      onChange={(e) => setNewVendor({ ...newVendor, category: e.target.value })}
                    >
                      <option value="Hybrid Seeds">Hybrid Seeds</option>
                      <option value="Shade Nets & Protective MESH">Shade Nets & Protective MESH</option>
                      <option value="Imported Vegetable Seeds">Imported Vegetable Seeds</option>
                      <option value="Agro Chemicals & Fertilizer">Agro Chemicals & Fertilizer</option>
                    </select>
                  </div>
                </div>

                <div className="modal-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>Payment Terms</label>
                    <select 
                      className="form-select"
                      value={newVendor.paymentTerms}
                      onChange={(e) => setNewVendor({ ...newVendor, paymentTerms: e.target.value })}
                    >
                      <option value="15 Days Net">15 Days Net</option>
                      <option value="30 Days Net">30 Days Net</option>
                      <option value="45 Days Net">45 Days Net</option>
                      <option value="Letter of Credit (LC)">Letter of Credit (LC)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 600, fontSize: '12px' }}>Contact Person Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Youssef Al-Zahrani"
                      value={newVendor.contactPerson}
                      onChange={(e) => setNewVendor({ ...newVendor, contactPerson: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Vendor Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
