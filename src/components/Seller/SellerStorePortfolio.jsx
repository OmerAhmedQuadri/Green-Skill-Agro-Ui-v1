import React, { useState } from 'react';
import { Store, Plus, Lock, CheckCircle, Search, Phone, ArrowLeft } from 'lucide-react';
import { STORE_CREDIT_DATA, CURRENT_SELLER } from '../../data/mockData';
import { NewStoreModal } from './Modals/NewStoreModal';

export const SellerStorePortfolio = ({ onNavigate }) => {
  const [showNewStoreModal, setShowNewStoreModal] = useState(false);
  const [search, setSearch] = useState('');

  const filteredStores = STORE_CREDIT_DATA.filter(s => 
    s.storeName.toLowerCase().includes(search.toLowerCase()) ||
    s.ownerName.toLowerCase().includes(search.toLowerCase()) ||
    s.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <div className="dashboard-topbar">
        <div>
          <div className="topbar-title">
            <Store size={18} />
            <span>My Store Portfolio ({CURRENT_SELLER.assignedStoresCount} Stores)</span>
          </div>
          <div className="topbar-subtitle">
            Assigned stores in route {CURRENT_SELLER.route}
          </div>
        </div>

        <div className="topbar-actions">
          <button className="btn-primary" onClick={() => setShowNewStoreModal(true)}>
            <Plus size={14} />
            <span>+ Onboard New Store</span>
          </button>
        </div>
      </div>

      <div className="data-panel">
        <div className="panel-header-toolbar">
          <div className="toolbar-controls" style={{ width: '100%', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <input
              type="text"
              className="table-search-input seller-search-input"
              placeholder="Search store name, owner, city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Showing {filteredStores.length} Stores</span>
          </div>
        </div>

        <div className="erp-table-wrapper">
          <table className="erp-table">
            <thead>
              <tr>
                <th>Store & Owner</th>
                <th>City</th>
                <th>Credit Cycle Terms</th>
                <th>Credit Limit</th>
                <th>Outstanding Balance</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStores.map((store) => (
                <tr key={store.storeId}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--color-forest-dark)' }}>{store.storeName}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{store.ownerName} ({store.storeId})</div>
                  </td>
                  <td>{store.city}</td>
                  <td>{store.creditCycle}</td>
                  <td>SAR {store.creditLimit.toLocaleString()}</td>
                  <td>
                    <strong style={{ color: store.blocked ? '#991b1b' : 'var(--text-main)' }}>
                      SAR {store.outstandingBalance.toLocaleString()}
                    </strong>
                  </td>
                  <td>
                    {store.blocked ? (
                      <span className="badge badge-danger">
                        <Lock size={10} />
                        BLOCKED (Past Due)
                      </span>
                    ) : (
                      <span className="badge badge-success">
                        <CheckCircle size={10} />
                        Active
                      </span>
                    )}
                  </td>
                  <td>
                    <button className="btn-sm-primary" onClick={() => onNavigate('new-sale')}>
                      <span>Create Sale</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showNewStoreModal && (
        <NewStoreModal
          onClose={() => setShowNewStoreModal(false)}
          onConfirm={(data) => {
            setShowNewStoreModal(false);
            alert(`Store "${data.storeName}" submitted for Manager approval!`);
          }}
        />
      )}
    </div>
  );
};
