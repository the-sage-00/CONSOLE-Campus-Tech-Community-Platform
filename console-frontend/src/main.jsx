import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Import your global styles if any

// Global error handler to suppress browser extension errors
window.addEventListener('error', (event) => {
  // Suppress browser extension errors
  if (event.error && event.error.message) {
    const message = event.error.message.toLowerCase();
    if (message.includes('extension port') || 
        message.includes('back/forward cache') ||
        message.includes('chrome-extension') ||
        message.includes('moz-extension')) {
      event.preventDefault();
      return false;
    }
  }
});

// Global unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason;
  if (reason && reason.message) {
    const message = reason.message.toLowerCase();
    if (message.includes('extension port') || 
        message.includes('back/forward cache') ||
        message.includes('chrome-extension') ||
        message.includes('moz-extension')) {
      event.preventDefault();
      return false;
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
