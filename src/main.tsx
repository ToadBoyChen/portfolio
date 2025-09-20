import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { inject } from '@vercel/analytics';
import { SpeedInsights } from '@vercel/speed-insights/react';

inject();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <SpeedInsights />
    </BrowserRouter>
  </React.StrictMode>
);
