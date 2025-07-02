console.log('main.jsx loaded');
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ReactApp from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactApp />
  </StrictMode>,
)

