import React from 'react';
import { Shield, UserCheck, AlertTriangle } from 'lucide-react';
import { useManagerContext } from '../../context/ManagerContext';

export const AdminPermissionsManager = ({ onShowToast }) => {
  const { userPermissions, updateUserPermission, updateUserStatus } = useManagerContext();
  const users = userPermissions || [];

  const handleTogglePermission = async (userId, field, currentVal, userName) => {
    const updatedVal = !currentVal;
    await updateUserPermission(userId, field, updatedVal);
    if (onShowToast) {
      onShowToast(`Updated permission for ${userName}: set ${field} to ${updatedVal ? 'GRANTED' : 'REVOKED'}.`);
    }
  };

  const handleToggleStatus = async (userId, currentStatus, userName) => {
    const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    await updateUserStatus(userId, newStatus);
    if (onShowToast) {
      onShowToast(`User account status for ${userName} changed to ${newStatus}.`);
    }
  };

  return (
    <div className="admin-page-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="data-panel" style={{ minHeight: 'auto' }}>
        <div className="panel-header-toolbar">
          <div className="panel-main-title">
            <Shield size={16} />
            <span>User Accounts & Operational Permission Set Grants</span>
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
            Granular action-level permissions assigned by Admin to Managers and Sellers.
          </div>
        </div>

        <div className="erp-table-wrapper">
          <table className="erp-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name & Role</th>
                <th>Assigned Location / Vehicle</th>
                <th>Credit Override</th>
                <th>Write-Off Approve</th>
                <th>Release Dispatch</th>
                <th>Verify Cash</th>
                <th>Setup Product</th>
                <th>Account Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.userId}>
                  <td><span className="code-cell">{u.userId}</span></td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--color-forest-dark)' }}>{u.userName}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{u.role}</div>
                  </td>
                  <td style={{ fontSize: '12px' }}>{u.assignedLocation}</td>

                  {/* Permission Toggles */}
                  <td>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: u.role === 'Seller' ? 'not-allowed' : 'pointer' }}>
                      <input 
                        type="checkbox"
                        disabled={u.role === 'Seller'}
                        checked={!!u.canOverrideCredit}
                        onChange={() => handleTogglePermission(u.userId, 'canOverrideCredit', u.canOverrideCredit, u.userName)}
                      />
                      <span style={{ fontSize: '11.5px', fontWeight: u.canOverrideCredit ? 700 : 400 }}>
                        {u.canOverrideCredit ? 'Granted' : 'Locked'}
                      </span>
                    </label>
                  </td>

                  <td>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: u.role === 'Seller' ? 'not-allowed' : 'pointer' }}>
                      <input 
                        type="checkbox"
                        disabled={u.role === 'Seller'}
                        checked={!!u.canApproveWriteOff}
                        onChange={() => handleTogglePermission(u.userId, 'canApproveWriteOff', u.canApproveWriteOff, u.userName)}
                      />
                      <span style={{ fontSize: '11.5px', fontWeight: u.canApproveWriteOff ? 700 : 400 }}>
                        {u.canApproveWriteOff ? 'Granted' : 'Locked'}
                      </span>
                    </label>
                  </td>

                  <td>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: u.role === 'Seller' ? 'not-allowed' : 'pointer' }}>
                      <input 
                        type="checkbox"
                        disabled={u.role === 'Seller'}
                        checked={!!u.canReleaseDispatch}
                        onChange={() => handleTogglePermission(u.userId, 'canReleaseDispatch', u.canReleaseDispatch, u.userName)}
                      />
                      <span style={{ fontSize: '11.5px', fontWeight: u.canReleaseDispatch ? 700 : 400 }}>
                        {u.canReleaseDispatch ? 'Granted' : 'Locked'}
                      </span>
                    </label>
                  </td>

                  <td>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: u.role === 'Seller' ? 'not-allowed' : 'pointer' }}>
                      <input 
                        type="checkbox"
                        disabled={u.role === 'Seller'}
                        checked={!!u.canVerifyCash}
                        onChange={() => handleTogglePermission(u.userId, 'canVerifyCash', u.canVerifyCash, u.userName)}
                      />
                      <span style={{ fontSize: '11.5px', fontWeight: u.canVerifyCash ? 700 : 400 }}>
                        {u.canVerifyCash ? 'Granted' : 'Locked'}
                      </span>
                    </label>
                  </td>

                  <td>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: u.role === 'Seller' ? 'not-allowed' : 'pointer' }}>
                      <input 
                        type="checkbox"
                        disabled={u.role === 'Seller'}
                        checked={!!u.canCreateProduct}
                        onChange={() => handleTogglePermission(u.userId, 'canCreateProduct', u.canCreateProduct, u.userName)}
                      />
                      <span style={{ fontSize: '11.5px', fontWeight: u.canCreateProduct ? 700 : 400 }}>
                        {u.canCreateProduct ? 'Granted' : 'Locked'}
                      </span>
                    </label>
                  </td>

                  <td>
                    <button 
                      className={u.status === 'Active' ? 'btn-sm-primary' : 'btn-sm-secondary'}
                      style={{ fontSize: '10.5px', padding: '3px 8px' }}
                      onClick={() => handleToggleStatus(u.userId, u.status, u.userName)}
                    >
                      {u.status === 'Active' ? <UserCheck size={11} /> : <AlertTriangle size={11} />}
                      <span>{u.status}</span>
                    </button>
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
