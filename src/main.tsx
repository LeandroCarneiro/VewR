import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SlideProvider } from './context/SlideContext'
import { LanguageProvider } from './context/LanguageContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <SlideProvider>
        <App />
      </SlideProvider>
    </LanguageProvider>
  </StrictMode>,
)
