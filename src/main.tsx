/** AuditID: CORE-001 | Oprava inicializace */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './router/App'

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element nebyl nalezen!');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);