import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AlertsProvider } from './components/Alerts.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AlertsProvider>
          <App />
        </AlertsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
