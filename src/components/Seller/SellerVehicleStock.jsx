import React from 'react';
import { Package, CheckCircle, AlertTriangle } from 'lucide-react';
import { useManagerContext } from '../../context/ManagerContext';
import { useLanguage } from '../../context/LanguageContext';

export const SellerVehicleStock = () => {
  const { inventory, currentSeller } = useManagerContext();
  const { t } = useLanguage();
  const stockList = inventory || [];
  const seller = currentSeller || { assignedVehicle: { id: 'VH-01', stockValue: 84200 } };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <div className="dashboard-topbar">
        <div>
          <div className="topbar-title">
            <Package size={18} />
            <span>{t('vehicleInventoryRegister')} (Van #{seller.assignedVehicle?.id})</span>
          </div>
          <div className="topbar-subtitle">
            {t('unsoldStockSubtitle')}: SAR {seller.assignedVehicle?.stockValue?.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="data-panel">
        <div className="erp-table-wrapper">
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
              {stockList.map((item) => (
                <tr key={item.sku}>
                  <td><span className="code-cell">{item.sku}</span></td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{item.productName}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t('vendorLabel')}: {item.vendorCode}</div>
                  </td>
                  <td>{item.category}</td>
                  <td>{item.packSize}</td>
                  <td><strong style={{ fontSize: '13px', color: 'var(--color-forest-dark)' }}>{item.fleetQty} {t('unitsLabel')}</strong></td>
                  <td><span className="badge badge-info">LOT: {item.lotNumber}</span></td>
                  <td>{item.expiryDate}</td>
                  <td>
                    {item.expiryStatus === 'Warning' ? (
                      <span className="badge badge-danger">
                        <AlertTriangle size={10} />
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
        </div>
      </div>
    </div>
  );
};
