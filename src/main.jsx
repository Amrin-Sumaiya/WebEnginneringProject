import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx'; // We will create this next

import App from './App.jsx';
import './index.css';
import 'leaflet/dist/leaflet.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* This BrowserRouter will control all routing for your app */}
    <BrowserRouter>
      {/* This AuthProvider will manage login state for your app */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
