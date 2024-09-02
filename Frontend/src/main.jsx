import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GlobalStateProvider } from './GlobalStateContext.jsx'

createRoot(document.getElementById('root')).render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
)
