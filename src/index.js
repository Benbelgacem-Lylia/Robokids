import React from 'react';
import ReactDOM from 'react-dom/client'; // Update import for React 18
import './index.css';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Import the i18n configuration

// Create a root using the new React 18 API
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);
