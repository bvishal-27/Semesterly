import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/layout/ProtectedRoute'
import Home         from './components/pages/Home'
import Login        from './components/pages/Login'
import SecretLogin  from './components/pages/SecretLogin'
import Admin        from './components/pages/Admin'
import About        from './components/pages/About'
import NotFound     from './components/pages/NotFound'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/"        element={<Layout><Home /></Layout>} />
          <Route path="/about"   element={<Layout><About /></Layout>} />

          {/* Secret admin access — /admin-access/:token */}
          <Route path="/admin-access/:token" element={<Layout><SecretLogin /></Layout>} />

          {/* /login still works but no link to it anywhere public */}
          <Route path="/login"   element={<Layout><Login /></Layout>} />

          <Route path="/admin"   element={
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
