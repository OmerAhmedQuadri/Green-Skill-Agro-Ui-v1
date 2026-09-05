import React, { useState } from 'react';
import { 
  AlertOctagon, 
  Send, 
  Banknote, 
  Lock, 
  Store, 
  CheckCircle, 
  Eye, 
  Clock,
  Camera
} from 'lucide-react';
import { useManagerContext } from '../context/ManagerContext';

export const ApprovalQueue = ({ 
  onViewPhoto, 
  onApproveWriteOff, 
  onHandleDispatch,
  onVerifyCash,
  onOverrideCredit,
  onApproveStore
}) => {
  const { approvals } = useManagerContext();
  const queueData = approvals || { writeOffs: [], dispatchRequests: [], cashHandovers: [], storeOverrides: [], newStores: [] };

  const [activeQueueTab, setActiveQueueTab] = useState('writeOffs');

  const tabs = [
    { id: 'writeOffs', label: 'Stock Write-Offs', count: queueData.writeOffs?.length || 0, icon: AlertOctagon, urgent: true },
    { id: 'dispatches', label: 'Warehouse Dispatches', count: queueData.dispatchRequests?.length || 0, icon: Send },
    { id: 'cash', label: 'Cash & Deposits', count: queueData.cashHandovers?.length || 0, icon: Banknote },
    { id: 'credit', label: 'Credit Overrides', count: queueData.storeOverrides?.length || 0, icon: Lock },
    { id: 'stores', label: 'Store Onboarding', count: queueData.newStores?.length || 0, icon: Store }
  ];

  return (
    <div className="queue-section">
      <div className="queue-header">
        <div className="queue-title-group">
          <Clock size={15} className="text-amber-700" />
          <span className="queue-title">Manager Approval & Operational Action Queue</span>
        </div>
        <div className="queue-tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeQueueTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveQueueTab(tab.id)}
              >
                <Icon size={13} />
                <span>{tab.label}</span>
                <span className={`tab-count ${tab.urgent ? 'urgent' : ''}`}>{tab.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="queue-content-body">
        {/* 1. STOCK WRITE-OFF QUEUE */}
        {activeQueueTab === 'writeOffs' && (
          <div className="approval-list">
            {(queueData.writeOffs || []).map((item) => (
              <div key={item.id} className="approval-card">
                <div className="approval-left">
                  <div className="approval-icon" style={{ backgroundColor: '#fef2f2', color: '#991b1b' }}>
                    <AlertOctagon size={16} />
                  </div>
                  <div className="approval-info">
                    <div className="approval-headline">
                      <span>{item.id}: {item.productName}</span>
                      <span className="code-cell">{item.sku}</span>
                      <span className="badge badge-danger">LOT: {item.lotNumber}</span>
                    </div>
                    <div className="approval-subtext">
                      <strong>Quantity:</strong> {item.quantity} | <strong>Location:</strong> {item.holdingLocation} | <strong>Submitted by:</strong> {item.submittedBy}
                    </div>
                    <div className="approval-meta">
                      <span><strong>Reason:</strong> {item.reason}</span>
                    </div>
                  </div>
                </div>

                <div className="approval-actions">
                  <div style={{ textAlign: 'right', marginRight: '8px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#991b1b' }}>SAR {item.totalValue?.toLocaleString()}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Loss Value</div>
                  </div>
                  <button className="btn-sm-secondary" onClick={() => onViewPhoto(item.photoEvidence, `Photo Evidence: ${item.id}`)}>
                    <Camera size={11} />
                    <span>View Evidence</span>
                  </button>
                  <button className="btn-sm-primary" onClick={() => onApproveWriteOff(item)}>
                    <CheckCircle size={11} />
                    <span>Approve Write-off</span>
                  </button>
                </div>
              </div>
            ))}
            {(queueData.writeOffs || []).length === 0 && (
              <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
                No pending stock write-off requests.
              </div>
            )}
          </div>
        )}

        {/* 2. WAREHOUSE DISPATCH QUEUE */}
        {activeQueueTab === 'dispatches' && (
          <div className="approval-list">
            {(queueData.dispatchRequests || []).map((item) => (
              <div key={item.id} className="approval-card">
                <div className="approval-left">
                  <div className="approval-icon" style={{ backgroundColor: '#eff6ff', color: '#1e40af' }}>
                    <Send size={16} />
                  </div>
                  <div className="approval-info">
                    <div className="approval-headline">
                      <span>{item.id}: {item.storeName}</span>
                      <span className="badge badge-info">{item.location}</span>
                    </div>
                    <div className="approval-subtext">
                      <strong>SKU:</strong> {item.productName} ({item.requestedQty}) | <strong>Seller:</strong> {item.sellerName}
                    </div>
                    <div className="approval-meta">
                      <span style={{ color: '#b45309', fontWeight: 600 }}>Shortfall: {item.vehicleCurrentStock}</span>
                    </div>
                  </div>
                </div>

                <div className="approval-actions">
                  <div style={{ textAlign: 'right', marginRight: '8px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-forest-dark)' }}>SAR {item.orderValue?.toLocaleString()}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Order Value</div>
                  </div>
                  <button className="btn-sm-primary" onClick={() => onHandleDispatch(item)}>
                    <Send size={11} />
                    <span>Process Dispatch</span>
                  </button>
                </div>
              </div>
            ))}
            {(queueData.dispatchRequests || []).length === 0 && (
              <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
                No pending warehouse dispatch requests.
              </div>
            )}
          </div>
        )}

        {/* 3. CASH & DEPOSIT QUEUE */}
        {activeQueueTab === 'cash' && (
          <div className="approval-list">
            {(queueData.cashHandovers || []).map((item) => (
              <div key={item.id} className="approval-card">
                <div className="approval-left">
                  <div className="approval-icon" style={{ backgroundColor: '#ecfdf5', color: '#166534' }}>
                    <Banknote size={16} />
                  </div>
                  <div className="approval-info">
                    <div className="approval-headline">
                      <span>{item.id}: {item.sellerName} ({item.route})</span>
                      <span className={`badge ${item.ceilingBreachFlag ? 'badge-warning' : 'badge-success'}`}>
                        {item.type}
                      </span>
                    </div>
                    <div className="approval-subtext">
                      <strong>Ref:</strong> {item.bankName} | <strong>Submitted:</strong> {item.dateSubmitted}
                    </div>
                  </div>
                </div>

                <div className="approval-actions">
                  <div style={{ textAlign: 'right', marginRight: '8px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#166534' }}>SAR {item.declaredAmount?.toLocaleString()}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Declared Cash</div>
                  </div>
                  <button className="btn-sm-secondary" onClick={() => onViewPhoto(item.proofImage, `Deposit Proof: ${item.id}`)}>
                    <Eye size={11} />
                    <span>View Slip</span>
                  </button>
                  <button className="btn-sm-primary" onClick={() => onVerifyCash(item)}>
                    <CheckCircle size={11} />
                    <span>Verify Handover</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. CREDIT OVERRIDE QUEUE */}
        {activeQueueTab === 'credit' && (
          <div className="approval-list">
            {(queueData.storeOverrides || []).map((item) => (
              <div key={item.id} className="approval-card">
                <div className="approval-left">
                  <div className="approval-icon" style={{ backgroundColor: '#fffbeb', color: '#92400e' }}>
                    <Lock size={16} />
                  </div>
                  <div className="approval-info">
                    <div className="approval-headline">
                      <span>{item.storeName}</span>
                      <span className="badge badge-danger">BLOCKED (Over Due Limit)</span>
                    </div>
                    <div className="approval-subtext">
                      <strong>Seller:</strong> {item.sellerName} | <strong>Cycle:</strong> {item.creditCycle} | <strong>Days Overdue:</strong> {item.daysOverdue} Days
                    </div>
                  </div>
                </div>

                <div className="approval-actions">
                  <div style={{ textAlign: 'right', marginRight: '8px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#92400e' }}>SAR {item.requestedSaleValue?.toLocaleString()}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Sale Value</div>
                  </div>
                  <button className="btn-sm-primary" onClick={() => onOverrideCredit(item)}>
                    <Lock size={11} />
                    <span>Grant Override</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 5. STORE ONBOARDING QUEUE */}
        {activeQueueTab === 'stores' && (
          <div className="approval-list">
            {(queueData.newStores || []).map((item) => (
              <div key={item.id} className="approval-card">
                <div className="approval-left">
                  <div className="approval-icon" style={{ backgroundColor: '#f0f4ee', color: '#1b4332' }}>
                    <Store size={16} />
                  </div>
                  <div className="approval-info">
                    <div className="approval-headline">
                      <span>{item.storeName}</span>
                      <span className="badge badge-success">{item.city}</span>
                      <span className="badge badge-info">CR: {item.crNumber}</span>
                    </div>
                    <div className="approval-subtext">
                      <strong>Owner:</strong> {item.ownerName} | <strong>Seller:</strong> {item.sellerName}
                    </div>
                  </div>
                </div>

                <div className="approval-actions">
                  <button className="btn-sm-secondary" onClick={() => onViewPhoto(item.storefrontPhoto, `Storefront: ${item.storeName}`)}>
                    <Camera size={11} />
                    <span>Storefront Photo</span>
                  </button>
                  <button className="btn-sm-primary" onClick={() => onApproveStore(item)}>
                    <CheckCircle size={11} />
                    <span>Approve Store</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
