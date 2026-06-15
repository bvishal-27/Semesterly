import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

// Ping once per browser per calendar day — not per session, not per refresh
async function pingVisit() {
  try {
    const todayKey = new Date().toISOString().split('T')[0] // YYYY-MM-DD
    const last = localStorage.getItem('sem_last_visit')
    if (last === todayKey) return // already counted today

    localStorage.setItem('sem_last_visit', todayKey)
    await fetch(`${import.meta.env.VITE_API_URL || '/api'}/analytics/ping`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {} // silent — never break app
}

pingVisit()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: { fontFamily: 'Inter, sans-serif', fontSize: '14px' },
          success: { duration: 3000 },
          error:   { duration: 4000 },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)
