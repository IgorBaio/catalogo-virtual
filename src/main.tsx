import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './screens/Home.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode >
    <Home />
  </StrictMode>,
)
