import React from 'react';
import { Package, Clock, CheckCircle, AlertTriangle, Truck, ArrowLeft } from 'lucide-react';
import { INVENTORY_STOCK, CURRENT_SELLER } from '../../data/mockData';

export const SellerVehicleStock = ({ onNavigate }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <div className="dashboard-topbar">
        <div>
          <div className="topbar-title">
            <Package size={18} />
            <span>Vehicle Inventory Register (Van #{CURRENT_SELLER.assignedVehicle.id})</span>
          </div>
          <div className="topbar-subtitle">
            Unsold stock remains on vehicle &bull; Total Valuation: SAR {CURRENT_SELLER.assignedVehicle.stockValue.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="data-panel">
        <div className="erp-table-wrapper">
          <table className="erp-table">
            <thead>
              <tr>
                <th>SKU Code</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Pack Size</th>
                <th>Van Quantity</th>
                <th>Batch / LOT</th>
                <th>Expiry Date</th>
                <th>FEFO Clearance Status</th>
              </tr>
            </thead>
            <tbody>
              {INVENTORY_STOCK.map((item) => (
                <tr key={item.sku}>
                  <td><span className="code-cell">{item.sku}</span></td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{item.productName}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Vendor: {item.vendorCode}</div>
                  </td>
                  <td>{item.category}</td>
                  <td>{item.packSize}</td>
                  <td><strong style={{ fontSize: '13px', color: 'var(--color-forest-dark)' }}>{item.fleetQty} units</strong></td>
                  <td><span className="badge badge-info">LOT: {item.lotNumber}</span></td>
                  <td>{item.expiryDate}</td>
                  <td>
                    {item.expiryStatus === 'Warning' ? (
                      <span className="badge badge-danger">
                        <AlertTriangle size={10} />
                        {item.expiryFlag}
                      </span>
                    ) : (
                      <span className="badge badge-success">
                        <CheckCircle size={10} />
                        Healthy Stock
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
