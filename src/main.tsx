import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { NexGestApp } from './NexGestApp'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <NexGestApp />
    </StrictMode>,
  </BrowserRouter>
)
