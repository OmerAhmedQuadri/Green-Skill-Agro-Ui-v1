import React, { useState } from 'react';
import { 
  AlertOctagon, 
  Send, 
  Banknote, 
  Lock, 
  Store, 
  CheckCircle, 
  XCircle, 
  Eye, 
  FileText,
  Clock,
  MapPin,
  Camera
} from 'lucide-react';
import { APPROVAL_ITEMS } from '../data/mockData';

export const ApprovalQueue = ({ 
  onViewPhoto, 
  onApproveWriteOff, 
  onHandleDispatch,
  onVerifyCash,
  onOverrideCredit,
  onApproveStore
}) => {
  const [activeQueueTab, setActiveQueueTab] = useState('writeOffs');

  const tabs = [
    { id: 'writeOffs', label: 'Stock Write-Offs', count: APPROVAL_ITEMS.writeOffs.length, icon: AlertOctagon, urgent: true },
    { id: 'dispatches', label: 'Warehouse Dispatches', count: APPROVAL_ITEMS.dispatchRequests.length, icon: Send },
    { id: 'cash', label: 'Cash & Deposits', count: APPROVAL_ITEMS.cashHandovers.length, icon: Banknote },
    { id: 'credit', label: 'Credit Overrides', count: APPROVAL_ITEMS.storeOverrides.length, icon: Lock },
    { id: 'stores', label: 'Store Onboarding', count: APPROVAL_ITEMS.newStores.length, icon: Store }
  ];

  return (
    <div className="queue-section">
      <div className="queue-header">
        <div className="queue-title-group">
          <Clock size={16} className="text-amber-700" />
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
                <Icon size={14} />
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
            {APPROVAL_ITEMS.writeOffs.map((item) => (
              <div key={item.id} className="approval-card">
                <div className="approval-left">
                  <div className="approval-icon" style={{ backgroundColor: '#fef2f2', color: '#991b1b' }}>
                    <AlertOctagon size={18} />
                  </div>
                  <div className="approval-info">
                    <div className="approval-headline">
                      <span>{item.id}: {item.productName}</span>
                      <span className="code-cell">{item.sku}</span>
                      <span className="badge badge-danger">LOT: {item.lotNumber}</span>
                    </div>
                    <div className="approval-subtext">
                      <strong>Quantity:</strong> {item.quantity} | <strong>Location:</strong> {item.holdingLocation} | <strong>Submitted by:</strong> {item.submittedBy} ({item.dateSubmitted})
                    </div>
                    <div className="approval-meta">
                      <span><strong>Reason:</strong> {item.reason}</span>
                    </div>
                  </div>
                </div>

                <div className="approval-actions">
                  <div style={{ textAlign: 'right', marginRight: '8px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#991b1b' }}>SAR {item.totalValue.toLocaleString()}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Write-off Value</div>
                  </div>
                  <button className="btn-sm-secondary" onClick={() => onViewPhoto(item.photoEvidence, `Photo Evidence: ${item.id} - ${item.productName}`)}>
                    <Camera size={12} />
                    <span>View Evidence</span>
                  </button>
                  <button className="btn-sm-primary" onClick={() => onApproveWriteOff(item)}>
                    <CheckCircle size={12} />
                    <span>Approve Write-off</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. WAREHOUSE DISPATCH QUEUE */}
        {activeQueueTab === 'dispatches' && (
          <div className="approval-list">
            {APPROVAL_ITEMS.dispatchRequests.map((item) => (
              <div key={item.id} className="approval-card">
                <div className="approval-left">
                  <div className="approval-icon" style={{ backgroundColor: '#eff6ff', color: '#1e40af' }}>
                    <Send size={18} />
                  </div>
                  <div className="approval-info">
                    <div className="approval-headline">
                      <span>{item.id}: {item.storeName}</span>
                      <span className="badge badge-info">{item.location}</span>
                    </div>
                    <div className="approval-subtext">
                      <strong>Requested SKU:</strong> {item.productName} ({item.requestedQty}) | <strong>Seller:</strong> {item.sellerName}
                    </div>
                    <div className="approval-meta">
                      <span style={{ color: '#b45309', fontWeight: 600 }}>Shortfall Reason: {item.vehicleCurrentStock}</span>
                    </div>
                  </div>
                </div>

                <div className="approval-actions">
                  <div style={{ textAlign: 'right', marginRight: '8px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-forest-dark)' }}>SAR {item.orderValue.toLocaleString()}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Order Value</div>
                  </div>
                  <button className="btn-sm-primary" onClick={() => onHandleDispatch(item)}>
                    <Send size={12} />
                    <span>Process Dispatch & Load Transport</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. CASH & DEPOSIT QUEUE */}
        {activeQueueTab === 'cash' && (
          <div className="approval-list">
            {APPROVAL_ITEMS.cashHandovers.map((item) => (
              <div key={item.id} className="approval-card">
                <div className="approval-left">
                  <div className="approval-icon" style={{ backgroundColor: '#ecfdf5', color: '#166534' }}>
                    <Banknote size={18} />
                  </div>
                  <div className="approval-info">
                    <div className="approval-headline">
                      <span>{item.id}: {item.sellerName} ({item.route})</span>
                      <span className={`badge ${item.ceilingBreachFlag ? 'badge-warning' : 'badge-success'}`}>
                        {item.type}
                      </span>
                    </div>
                    <div className="approval-subtext">
                      <strong>Reference:</strong> {item.bankName} | <strong>Submitted:</strong> {item.dateSubmitted}
                    </div>
                  </div>
                </div>

                <div className="approval-actions">
                  <div style={{ textAlign: 'right', marginRight: '8px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#166534' }}>SAR {item.declaredAmount.toLocaleString()}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Declared Cash</div>
                  </div>
                  <button className="btn-sm-secondary" onClick={() => onViewPhoto(item.proofImage, `Deposit Slip Proof: ${item.id} - ${item.sellerName}`)}>
                    <Eye size={12} />
                    <span>View Slip</span>
                  </button>
                  <button className="btn-sm-primary" onClick={() => onVerifyCash(item)}>
                    <CheckCircle size={12} />
                    <span>Verify & Release Handover</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. CREDIT OVERRIDE QUEUE */}
        {activeQueueTab === 'credit' && (
          <div className="approval-list">
            {APPROVAL_ITEMS.storeOverrides.map((item) => (
              <div key={item.id} className="approval-card">
                <div className="approval-left">
                  <div className="approval-icon" style={{ backgroundColor: '#fffbeb', color: '#92400e' }}>
                    <Lock size={18} />
                  </div>
                  <div className="approval-info">
                    <div className="approval-headline">
                      <span>{item.storeName}</span>
                      <span className="badge badge-danger">BLOCKED (SAR {item.currentOutstanding.toLocaleString()} / SAR {item.creditLimit.toLocaleString()})</span>
                    </div>
                    <div className="approval-subtext">
                      <strong>Seller:</strong> {item.sellerName} | <strong>Cycle:</strong> {item.creditCycle} | <strong>Days Overdue:</strong> {item.daysOverdue} Days
                    </div>
                    <div className="approval-meta">
                      <span><strong>Requested Override Note:</strong> "{item.reason}"</span>
                    </div>
                  </div>
                </div>

                <div className="approval-actions">
                  <div style={{ textAlign: 'right', marginRight: '8px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#92400e' }}>SAR {item.requestedSaleValue.toLocaleString()}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Sale Value</div>
                  </div>
                  <button className="btn-sm-primary" onClick={() => onOverrideCredit(item)}>
                    <Lock size={12} />
                    <span>Grant Manager Override</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 5. STORE ONBOARDING QUEUE */}
        {activeQueueTab === 'stores' && (
          <div className="approval-list">
            {APPROVAL_ITEMS.newStores.map((item) => (
              <div key={item.id} className="approval-card">
                <div className="approval-left">
                  <div className="approval-icon" style={{ backgroundColor: '#f0f4ee', color: '#1b4332' }}>
                    <Store size={18} />
                  </div>
                  <div className="approval-info">
                    <div className="approval-headline">
                      <span>{item.storeName}</span>
                      <span className="badge badge-success">{item.city}</span>
                      <span className="badge badge-info">CR: {item.crNumber}</span>
                    </div>
                    <div className="approval-subtext">
                      <strong>Owner:</strong> {item.ownerName} ({item.contactPhone}) | <strong>Seller:</strong> {item.sellerName}
                    </div>
                    <div className="approval-meta">
                      <span><strong>Proposed Terms:</strong> {item.proposedCycle} (SAR {item.proposedLimit.toLocaleString()} limit)</span>
                    </div>
                  </div>
                </div>

                <div className="approval-actions">
                  <button className="btn-sm-secondary" onClick={() => onViewPhoto(item.storefrontPhoto, `Storefront Photo: ${item.storeName}`)}>
                    <Camera size={12} />
                    <span>View Storefront</span>
                  </button>
                  <button className="btn-sm-primary" onClick={() => onApproveStore(item)}>
                    <CheckCircle size={12} />
                    <span>Approve Store Account</span>
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
