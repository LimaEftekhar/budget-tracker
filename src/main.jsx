import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import {BudgetsProvider} from './contexts/BudgetsContext.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BudgetsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BudgetsProvider>
  </React.StrictMode>
)