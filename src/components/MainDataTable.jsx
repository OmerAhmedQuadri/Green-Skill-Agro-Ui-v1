import React, { useState, useEffect, useRef } from 'react';
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
import { useLanguage } from '../context/LanguageContext';

export const MainDataTable = ({ activeTab, onOverrideCredit, onViewPoDetails, searchQuery }) => {
  const { fleet, inventory, orders, stores } = useManagerContext();
  const { t } = useLanguage();
  const [tableSearch, setTableSearch] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [prevTab, setPrevTab] = useState(activeTab);
  const filterRef = useRef(null);

  const query = (searchQuery || tableSearch).toLowerCase();

  // Reset filter when tab changes
  if (prevTab !== activeTab) {
    setPrevTab(activeTab);
    setFilterOption('all');
    setIsFilterOpen(false);
  }

  // Close filter popover on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredFleet = (fleet || []).filter(item => {
    const matchesSearch = 
      item.vehicleId?.toLowerCase().includes(query) ||
      item.registration?.toLowerCase().includes(query) ||
      item.assignedSeller?.toLowerCase().includes(query) ||
      item.route?.toLowerCase().includes(query);

    if (!matchesSearch) return false;
    if (filterOption === 'cash_breach') return item.cashBreach;
    if (filterOption === 'audit_due') return item.auditDueFlag;
    if (filterOption === 'active') return item.attendanceStatus?.toLowerCase().includes('checked') || item.attendanceStatus?.toLowerCase().includes('present');
    return true;
  });

  const filteredInventory = (inventory || []).filter(item => {
    const matchesSearch = 
      item.sku?.toLowerCase().includes(query) ||
      item.productName?.toLowerCase().includes(query) ||
      item.category?.toLowerCase().includes(query) ||
      item.lotNumber?.toLowerCase().includes(query);

    if (!matchesSearch) return false;
    if (filterOption === 'expiry_warning') return item.expiryStatus === 'Warning';
    if (filterOption === 'expiry_healthy') return item.expiryStatus !== 'Warning';
    if (filterOption === 'cat_seeds') return item.category?.toLowerCase().includes('seed');
    if (filterOption === 'cat_nets') return item.category?.toLowerCase().includes('net') || item.category?.toLowerCase().includes('mesh');
    if (filterOption === 'cat_chem') return item.category?.toLowerCase().includes('chem') || item.category?.toLowerCase().includes('fertilizer');
    return true;
  });

  const filteredOrders = (orders || []).filter(item => {
    const matchesSearch = 
      item.poNumber?.toLowerCase().includes(query) ||
      item.vendorName?.toLowerCase().includes(query) ||
      item.itemsSummary?.toLowerCase().includes(query) ||
      item.stateName?.toLowerCase().includes(query);

    if (!matchesSearch) return false;
    if (filterOption === 'draft_pending') return item.stateIndex <= 2 || item.stateName?.toLowerCase().includes('draft') || item.stateName?.toLowerCase().includes('pending');
    if (filterOption === 'approved_issued') return item.stateIndex === 6 || item.stateName?.toLowerCase().includes('issued') || item.stateName?.toLowerCase().includes('approved');
    if (filterOption === 'in_transit') return item.stateIndex > 6 || item.stateName?.toLowerCase().includes('transit') || item.stateName?.toLowerCase().includes('shipped');
    return true;
  });

  const filteredStores = (stores || []).filter(item => {
    const matchesSearch = 
      item.storeId?.toLowerCase().includes(query) ||
      item.storeName?.toLowerCase().includes(query) ||
      item.ownerName?.toLowerCase().includes(query) ||
      item.assignedSeller?.toLowerCase().includes(query);

    if (!matchesSearch) return false;
    if (filterOption === 'blocked') return item.blocked;
    if (filterOption === 'active') return !item.blocked;
    if (filterOption === 'overdue') return item.daysOverdue > 0;
    return true;
  });

  const getFilterOptions = (tab) => {
    switch (tab) {
      case 'inventory':
        return [
          { key: 'all', label: t('categoryFilter') },
          { key: 'expiry_warning', label: `⚠️ ${t('expiringSoon')}` },
          { key: 'expiry_healthy', label: `✅ ${t('healthyStock')}` }
        ];
      case 'orders':
        return [
          { key: 'all', label: t('categoryFilter') },
          { key: 'draft_pending', label: `📝 ${t('draft')} / ${t('pending')}` },
          { key: 'approved_issued', label: `✅ ${t('approved')}` },
          { key: 'in_transit', label: `🚚 ${t('inTransit')}` }
        ];
      case 'stores':
        return [
          { key: 'all', label: t('categoryFilter') },
          { key: 'blocked', label: `🚫 ${t('blocked')}` },
          { key: 'active', label: `✅ ${t('active')}` }
        ];
      default:
        return [
          { key: 'all', label: t('categoryFilter') },
          { key: 'cash_breach', label: `⚠️ ${t('cashLimitCeiling')}` },
          { key: 'active', label: `🟢 ${t('active')}` }
        ];
    }
  };

  const currentOptions = getFilterOptions(activeTab);

  return (
    <div className="data-panel">
      <div className="panel-header-toolbar">
        <div className="panel-main-title">
          {activeTab === 'overview' && (
            <>
              <Truck size={15} />
              <span>{t('vehicleFleetSellers')}</span>
            </>
          )}
          {activeTab === 'fleet' && (
            <>
              <Truck size={15} />
              <span>{t('vehicleFleetSellers')}</span>
            </>
          )}
          {activeTab === 'inventory' && (
            <>
              <Package size={15} />
              <span>{t('warehouseStock')}</span>
            </>
          )}
          {activeTab === 'orders' && (
            <>
              <FileText size={15} />
              <span>{t('purchaseOrdersPO')}</span>
            </>
          )}
          {activeTab === 'stores' && (
            <>
              <Store size={15} />
              <span>{t('storesCreditLedger')}</span>
            </>
          )}
          {(activeTab !== 'overview' && activeTab !== 'fleet' && activeTab !== 'inventory' && activeTab !== 'orders' && activeTab !== 'stores') && (
            <>
              <Package size={15} />
              <span>{t('operationalControl')}</span>
            </>
          )}
        </div>

        <div className="toolbar-controls">
          <input
            type="text"
            className="table-search-input"
            placeholder={t('searchPlaceholder')}
            value={tableSearch}
            onChange={(e) => setTableSearch(e.target.value)}
          />
          <div className="filter-dropdown-wrapper" ref={filterRef}>
            <button 
              className={`btn-secondary ${filterOption !== 'all' ? 'active-filter' : ''}`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={11} />
              <span>{filterOption === 'all' ? t('filter') : t('filter')}</span>
            </button>

            {isFilterOpen && (
              <div className="filter-dropdown-popover">
                <div className="filter-dropdown-header">
                  <span>{t('filter')}</span>
                  {filterOption !== 'all' && (
                    <button className="filter-reset-btn" onClick={() => setFilterOption('all')}>Reset</button>
                  )}
                </div>
                <div className="filter-dropdown-options">
                  {currentOptions.map(opt => (
                    <button
                      key={opt.key}
                      className={`filter-option-item ${filterOption === opt.key ? 'selected' : ''}`}
                      onClick={() => {
                        setFilterOption(opt.key);
                        setIsFilterOpen(false);
                      }}
                    >
                      <span className="filter-option-label">{opt.label}</span>
                      {filterOption === opt.key && <CheckCircle size={12} className="filter-check-icon" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="erp-table-wrapper">
        {/* VIEW 1: FLEET & SELLERS */}
        {(activeTab === 'overview' || activeTab === 'fleet' || activeTab === 'attendance' || activeTab === 'cash') && (
          <table className="erp-table">
            <thead>
              <tr>
                <th>{t('assignedVehicle')}</th>
                <th>{t('sellerRole')}</th>
                <th>{t('shiftAttendance')}</th>
                <th>{t('vanStock')}</th>
                <th>{t('cashInHand')}</th>
                <th>{t('salesVolume')}</th>
                <th>{t('status')}</th>
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
                      {row.cashBreach && <span className="badge badge-danger">{t('alert')}</span>}
                    </div>
                  </td>
                  <td>
                    <strong style={{ color: '#166534' }}>SAR {row.todaySales?.toLocaleString()}</strong>
                  </td>
                  <td>
                    {row.auditDueFlag ? (
                      <span className="badge badge-warning">
                        <AlertTriangle size={10} />
                        {t('overdueVehicleAudits')}
                      </span>
                    ) : (
                      <span className="badge badge-success">
                        <CheckCircle size={10} />
                        {t('active')}
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
                <th>{t('skuCode')}</th>
                <th>{t('productName')}</th>
                <th>{t('category')}</th>
                <th>{t('packSize')}</th>
                <th>{t('vanQty')}</th>
                <th>{t('batchLot')}</th>
                <th>{t('expiryDate')}</th>
                <th>{t('fefoStatus')}</th>
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
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{t('vendorLabel')}: {row.vendorCode}</div>
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
                        {t('expiringSoon')}
                      </span>
                    ) : (
                      <span className="badge badge-success">
                        <CheckCircle size={10} />
                        {t('healthyStock')}
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
                <th>{t('id')}</th>
                <th>{t('vendorLabel')}</th>
                <th>{t('item')}</th>
                <th>{t('totalAmount')}</th>
                <th>{t('status')}</th>
                <th>{t('date')}</th>
                <th>{t('action')}</th>
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
                      <span>{t('viewDetails')}</span>
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
                <th>{t('storeAndOwner')}</th>
                <th>{t('cityCol')}</th>
                <th>{t('creditCycleTerms')}</th>
                <th>{t('creditLimit')}</th>
                <th>{t('outstandingBalanceCol')}</th>
                <th>{t('status')}</th>
                <th>{t('action')}</th>
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
                        {t('blockedPastDue')}
                      </span>
                    ) : (
                      <span className="badge badge-success">
                        <CheckCircle size={10} />
                        {t('active')}
                      </span>
                    )}
                  </td>
                  <td>
                    {row.blocked && (
                      <button className="btn-sm-primary" onClick={() => onOverrideCredit(row)}>
                        <Lock size={10} />
                        <span>{t('override')}</span>
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
