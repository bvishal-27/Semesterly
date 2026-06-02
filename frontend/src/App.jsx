import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/layout/ProtectedRoute'
import Home     from './components/pages/Home'
import Login    from './components/pages/Login'
import Admin    from './components/pages/Admin'
import About    from './components/pages/About'
import NotFound from './components/pages/NotFound'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/"      element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/admin" element={
            <Layout>
              <ProtectedRoute adminOnly>
                <Admin />
              </ProtectedRoute>
            </Layout>
          } />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}
