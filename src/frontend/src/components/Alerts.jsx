import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import './Alerts.css';

const AlertsContext = createContext(null);

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function AlertsProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  const removeAlert = useCallback((id) => {
    setAlerts((current) => current.filter((alert) => alert.id !== id));
  }, []);

  const show = useCallback(
    (type, title, description) => {
      const id = createId();
      setAlerts((current) => [...current, { id, type, title, description }]);
      window.setTimeout(() => {
        removeAlert(id);
      }, 5000);
    },
    [removeAlert]
  );

  const contextValue = useMemo(
    () => ({
      showSuccess: (title, description) => show('success', title, description),
      showError: (title, description) => show('error', title, description),
      showInfo: (title, description) => show('info', title, description),
      dismiss: removeAlert
    }),
    [removeAlert, show]
  );

  return (
    <AlertsContext.Provider value={contextValue}>
      {children}
      <div className="alerts-container" aria-live="polite" aria-atomic="true">
        {alerts.map((alert) => (
          <div key={alert.id} className={`alert ${alert.type}`} role="status">
            <div className="alert-header">
              <span>{alert.title}</span>
              <button type="button" aria-label="Fechar notificação" onClick={() => removeAlert(alert.id)}>
                ×
              </button>
            </div>
            {alert.description && <p>{alert.description}</p>}
          </div>
        ))}
      </div>
    </AlertsContext.Provider>
  );
}

export function useAlerts() {
  const context = useContext(AlertsContext);
  if (!context) {
    throw new Error('useAlerts must be used within an AlertsProvider');
  }
  return context;
}

export default AlertsProvider;
