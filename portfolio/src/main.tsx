import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n/config'
import './styles/tokens.css'
import './styles/reset.css'
import './styles/global.css'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
