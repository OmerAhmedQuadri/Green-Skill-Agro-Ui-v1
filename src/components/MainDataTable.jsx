import React, { useState } from 'react';
import { 
  Truck, 
  Package, 
  FileText, 
  Store, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  ExternalLink, 
  Lock,
  Filter
} from 'lucide-react';
import { useManagerContext } from '../context/ManagerContext';

export const MainDataTable = ({ activeTab, onOverrideCredit, onViewPoDetails, searchQuery }) => {
  const { fleet, inventory, orders, stores } = useManagerContext();
  const [tableSearch, setTableSearch] = useState('');
  const query = (searchQuery || tableSearch).toLowerCase();

  const filteredFleet = (fleet || []).filter(item => 
    item.vehicleId?.toLowerCase().includes(query) ||
    item.registration?.toLowerCase().includes(query) ||
    item.assignedSeller?.toLowerCase().includes(query) ||
    item.route?.toLowerCase().includes(query)
  );

  const filteredInventory = (inventory || []).filter(item => 
    item.sku?.toLowerCase().includes(query) ||
    item.productName?.toLowerCase().includes(query) ||
    item.category?.toLowerCase().includes(query) ||
    item.lotNumber?.toLowerCase().includes(query)
  );

  const filteredOrders = (orders || []).filter(item => 
    item.poNumber?.toLowerCase().includes(query) ||
    item.vendorName?.toLowerCase().includes(query) ||
    item.itemsSummary?.toLowerCase().includes(query) ||
    item.stateName?.toLowerCase().includes(query)
  );

  const filteredStores = (stores || []).filter(item => 
    item.storeId?.toLowerCase().includes(query) ||
    item.storeName?.toLowerCase().includes(query) ||
    item.ownerName?.toLowerCase().includes(query) ||
    item.assignedSeller?.toLowerCase().includes(query)
  );

  return (
    <div className="data-panel">
      <div className="panel-header-toolbar">
        <div className="panel-main-title">
          {activeTab === 'overview' && (
            <>
              <Truck size={15} />
              <span>Live Fleet & Field Operations Summary</span>
            </>
          )}
          {activeTab === 'fleet' && (
            <>
              <Truck size={15} />
              <span>Vehicle Fleet Register & Field Assignments</span>
            </>
          )}
          {activeTab === 'inventory' && (
            <>
              <Package size={15} />
              <span>Warehouse Stock & Expiry FEFO Clearance Priority</span>
            </>
          )}
          {activeTab === 'orders' && (
            <>
              <FileText size={15} />
              <span>Purchase Order Lifecycle & Procurement Pipeline</span>
            </>
          )}
          {activeTab === 'stores' && (
            <>
              <Store size={15} />
              <span>Store Portfolio Credit Cycles & Overdue Blocks</span>
            </>
          )}
          {(activeTab !== 'overview' && activeTab !== 'fleet' && activeTab !== 'inventory' && activeTab !== 'orders' && activeTab !== 'stores') && (
            <>
              <Package size={15} />
              <span>Operational Management Ledger</span>
            </>
          )}
        </div>

        <div className="toolbar-controls">
          <input
            type="text"
            className="table-search-input"
            placeholder="Filter list..."
            value={tableSearch}
            onChange={(e) => setTableSearch(e.target.value)}
          />
          <button className="btn-secondary">
            <Filter size={11} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="erp-table-wrapper">
        {/* VIEW 1: FLEET & SELLERS */}
        {(activeTab === 'overview' || activeTab === 'fleet' || activeTab === 'attendance' || activeTab === 'cash') && (
          <table className="erp-table">
            <thead>
              <tr>
                <th>Vehicle & Model</th>
                <th>Seller & Route</th>
                <th>Attendance</th>
                <th>Vehicle Stock</th>
                <th>Cash in Hand</th>
                <th>Today's Sales</th>
                <th>Audit Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredFleet.map((row) => (
                <tr key={row.vehicleId}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--color-forest-dark)' }}>{row.vehicleId} ({row.registration})</div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{row.model}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{row.assignedSeller}</div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{row.route}</div>
                  </td>
                  <td>
                    <span className="badge badge-success">{row.attendanceStatus}</span>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>{row.distanceKm} km &bull; {row.activeHours}</div>
                  </td>
                  <td>
                    <strong style={{ color: 'var(--color-forest-dark)' }}>SAR {row.stockValue?.toLocaleString()}</strong>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <strong>SAR {row.cashInHand?.toLocaleString()}</strong>
                      {row.cashBreach && <span className="badge badge-danger">Breach</span>}
                    </div>
                  </td>
                  <td>
                    <strong style={{ color: '#166534' }}>SAR {row.todaySales?.toLocaleString()}</strong>
                  </td>
                  <td>
                    {row.auditDueFlag ? (
                      <span className="badge badge-warning">
                        <AlertTriangle size={10} />
                        Overdue Audit
                      </span>
                    ) : (
                      <span className="badge badge-success">
                        <CheckCircle size={10} />
                        Clean
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* VIEW 2: INVENTORY & EXPIRY WATCH */}
        {activeTab === 'inventory' && (
          <table className="erp-table">
            <thead>
              <tr>
                <th>SKU Code</th>
                <th>Product & Variety</th>
                <th>Category</th>
                <th>Pack Size</th>
                <th>Stock (WH / Fleet)</th>
                <th>Batch / LOT</th>
                <th>Expiry Date</th>
                <th>Clearance Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((row) => (
                <tr key={row.sku}>
                  <td>
                    <span className="code-cell">{row.sku}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{row.productName}</div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Vendor: {row.vendorCode}</div>
                  </td>
                  <td>{row.category}</td>
                  <td>{row.packSize}</td>
                  <td>
                    <strong>{row.warehouseQty}</strong> WH / <strong>{row.fleetQty}</strong> Fleet
                  </td>
                  <td>
                    <span className="badge badge-info">LOT: {row.lotNumber}</span>
                  </td>
                  <td>
                    <div><strong>Exp:</strong> {row.expiryDate}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>MFD: {row.mfd}</div>
                  </td>
                  <td>
                    {row.expiryStatus === 'Warning' ? (
                      <span className="badge badge-danger">
                        <Clock size={10} />
                        {row.expiryFlag}
                      </span>
                    ) : (
                      <span className="badge badge-success">
                        <CheckCircle size={10} />
                        {row.expiryFlag}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* VIEW 3: PURCHASE ORDERS (PO) */}
        {(activeTab === 'orders' || activeTab === 'analytics') && (
          <table className="erp-table">
            <thead>
              <tr>
                <th>PO Number</th>
                <th>Vendor</th>
                <th>Items Summary</th>
                <th>PO Value</th>
                <th>9-State Lifecycle</th>
                <th>Expected Arrival</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((row) => (
                <tr key={row.poNumber}>
                  <td>
                    <span className="code-cell">{row.poNumber}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{row.vendorName}</div>
                  </td>
                  <td>{row.itemsSummary}</td>
                  <td>
                    <strong style={{ color: 'var(--color-forest-dark)' }}>SAR {row.totalValue?.toLocaleString()}</strong>
                  </td>
                  <td>
                    <span className={`badge ${row.stateIndex === 6 ? 'badge-info' : row.stateIndex === 1 ? 'badge-warning' : 'badge-success'}`}>
                      {row.stateName}
                    </span>
                  </td>
                  <td>
                    <div>{row.expectedArrival}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Lead: {row.leadTimeDays}d</div>
                  </td>
                  <td>
                    <button className="btn-sm-secondary" onClick={() => onViewPoDetails(row)}>
                      <ExternalLink size={10} />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* VIEW 4: STORE CREDIT & OVERDUE BLOCKS */}
        {activeTab === 'stores' && (
          <table className="erp-table">
            <thead>
              <tr>
                <th>Store & Owner</th>
                <th>Location & Seller</th>
                <th>Credit Terms</th>
                <th>Outstanding / Limit</th>
                <th>Overdue Days</th>
                <th>Credit Status</th>
                <th>Manager Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStores.map((row) => (
                <tr key={row.storeId}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--color-forest-dark)' }}>{row.storeName}</div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Owner: {row.ownerName} ({row.storeId})</div>
                  </td>
                  <td>
                    <div>{row.city}</div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Seller: {row.assignedSeller}</div>
                  </td>
                  <td>{row.creditCycle}</td>
                  <td>
                    <strong style={{ color: row.blocked ? '#991b1b' : 'var(--text-main)' }}>
                      SAR {row.outstandingBalance?.toLocaleString()}
                    </strong> / SAR {row.creditLimit?.toLocaleString()}
                  </td>
                  <td>
                    {row.daysOverdue > 0 ? (
                      <span className="badge badge-danger">{row.daysOverdue} Days</span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>0 Days</span>
                    )}
                  </td>
                  <td>
                    {row.blocked ? (
                      <span className="badge badge-danger">
                        <Lock size={10} />
                        BLOCKED
                      </span>
                    ) : (
                      <span className="badge badge-success">
                        <CheckCircle size={10} />
                        Active
                      </span>
                    )}
                  </td>
                  <td>
                    {row.blocked && (
                      <button className="btn-sm-primary" onClick={() => onOverrideCredit(row)}>
                        <Lock size={10} />
                        <span>Override</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
