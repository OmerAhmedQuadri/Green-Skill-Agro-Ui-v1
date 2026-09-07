import React from 'react';
import { Package, Banknote, ShoppingCart, Truck } from 'lucide-react';
import { useManagerContext } from '../context/ManagerContext';
import { useLanguage } from '../context/LanguageContext';

export const MetricsOverview = () => {
  const { metrics } = useManagerContext();
  const { t } = useLanguage();
  const data = metrics || {};

  const formatSAR = (val) => {
    if (val === undefined || val === null) return 'SAR 0';
    return new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="metrics-grid">
      {/* 1. Inventory Valuation */}
      <div className="metric-card">
        <div>
          <div className="metric-card-header">
            <span className="metric-title">{t('systemStockPosition')}</span>
            <div className="metric-icon-box">
              <Package size={15} />
            </div>
          </div>
          <div className="metric-value">{formatSAR(data.totalInventoryValue)}</div>
        </div>
        <div className="metric-sub-breakdown">
          <div className="breakdown-row">
            <span>{t('warehouseHub')}:</span>
            <span className="breakdown-val">{formatSAR(data.warehouseValue)}</span>
          </div>
          <div className="breakdown-row">
            <span>{t('vehicleFleetVans')}:</span>
            <span className="breakdown-val">{formatSAR(data.fleetValue)}</span>
          </div>
          <div className="breakdown-row">
            <span>{t('inTransitPipeline')}:</span>
            <span className="breakdown-val">{formatSAR(data.inTransitValue)}</span>
          </div>
          <div className="breakdown-row" style={{ marginTop: '2px', paddingTop: '2px', borderTop: '1px dashed #e8ede6' }}>
            <span style={{ color: '#b91c1c' }}>{t('expiryAtRisk')}:</span>
            <span className="breakdown-val alert">{formatSAR(data.expiryRiskValue)} ({data.expiryRiskCount} SKUs)</span>
          </div>
        </div>
      </div>

      {/* 2. Today's Collections & Cash in Hand */}
      <div className="metric-card">
        <div>
          <div className="metric-card-header">
            <span className="metric-title">{t('collectionsCashHandover')}</span>
            <div className="metric-icon-box">
              <Banknote size={15} />
            </div>
          </div>
          <div className="metric-value">{formatSAR(data.todayCollections)}</div>
        </div>
        <div className="metric-sub-breakdown">
          <div className="breakdown-row">
            <span>{t('approvedDeposits')}:</span>
            <span className="breakdown-val" style={{ color: '#15803d' }}>{formatSAR(data.collectionsApproved)}</span>
          </div>
          <div className="breakdown-row">
            <span>{t('pendingReview')}:</span>
            <span className="breakdown-val" style={{ color: '#b45309' }}>{formatSAR(data.collectionsPending)}</span>
          </div>
          <div className="breakdown-row">
            <span>{t('overdueBalances')}:</span>
            <span className="breakdown-val alert">{formatSAR(data.overdueAmount)} ({data.overdueStoresCount} {t('storesOnboarded')})</span>
          </div>
        </div>
      </div>

      {/* 3. Sales & Dispatch Demand */}
      <div className="metric-card">
        <div>
          <div className="metric-card-header">
            <span className="metric-title">{t('todaysRevenueDispatches')}</span>
            <div className="metric-icon-box">
              <ShoppingCart size={15} />
            </div>
          </div>
          <div className="metric-value">{formatSAR(data.todaySales)}</div>
        </div>
        <div className="metric-sub-breakdown">
          <div className="breakdown-row">
            <span>{t('fieldVanSales')}:</span>
            <span className="breakdown-val">{formatSAR(data.vehicleSales)}</span>
          </div>
          <div className="breakdown-row">
            <span>{t('directWhDispatches')}:</span>
            <span className="breakdown-val">{formatSAR(data.dispatchSales)}</span>
          </div>
          <div className="breakdown-row">
            <span>{t('pendingDispatchRelease')}:</span>
            <span className="breakdown-val" style={{ color: '#1d4ed8' }}>{data.activeDispatchesPending} Orders</span>
          </div>
        </div>
      </div>

      {/* 4. Fleet & Operational Health */}
      <div className="metric-card">
        <div>
          <div className="metric-card-header">
            <span className="metric-title">{t('fieldWorkforceFleet')}</span>
            <div className="metric-icon-box">
              <Truck size={15} />
            </div>
          </div>
          <div className="metric-value">{data.sellersCheckedIn || 0} / {data.activeSellersCount || 0} {t('sellerRole')}</div>
        </div>
        <div className="metric-sub-breakdown">
          <div className="breakdown-row">
            <span>{t('activeShiftsSelfie')}:</span>
            <span className="breakdown-val" style={{ color: '#15803d' }}>5 Active</span>
          </div>
          <div className="breakdown-row">
            <span>{t('cashLimitBreaches')}:</span>
            <span className="breakdown-val alert">{data.cashCeilingBreaches} Vehicles Exceeded</span>
          </div>
          <div className="breakdown-row">
            <span>{t('overdueVehicleAudits')}:</span>
            <span className="breakdown-val alert">1 Van (VH-02)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
