import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SlideProvider } from './context/SlideContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SlideProvider>
      <App />
    </SlideProvider>
  </StrictMode>,
)
