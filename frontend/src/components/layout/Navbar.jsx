import { useState, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Sun, Moon, BookOpen, Menu, X, LogOut, Shield } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { dark, toggle } = useTheme()
  const { user, logout, isAdmin } = useAuth()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const navigate = useNavigate()

  // Secret: triple-click the logo → goes to /login
  const clickCount = useRef(0)
  const clickTimer = useRef(null)
  const handleLogoClick = () => {
    if (user) return // already logged in, just go home
    clickCount.current += 1
    clearTimeout(clickTimer.current)
    clickTimer.current = setTimeout(() => { clickCount.current = 0 }, 700)
    if (clickCount.current >= 3) { clickCount.current = 0; navigate('/login') }
  }

  // Public links — NO admin link shown to students
  const links = [
    { to: '/', label: 'Browse' },
    { to: '/about', label: 'About' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#0f1117]/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[60px] gap-4">

        {/* Logo — triple click = secret admin access */}
        <button onClick={handleLogoClick}
          className="flex items-center gap-2.5 shrink-0 select-none"
          title={user ? 'Semesterly' : undefined}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm"
            style={{ background: 'linear-gradient(135deg,#FF7F50,#54a0ff)' }}>
            <BookOpen className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-black text-[15px] tracking-tight text-gray-900 dark:text-white">
            Semesterly
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-0.5 flex-1 justify-center">
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} end
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-[#FF7F50] bg-orange-50 dark:bg-orange-500/10'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/60'
                }`}>
              {label}
            </NavLink>
          ))}
          {/* Admin link — only if logged in */}
          {isAdmin && (
            <NavLink to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-[#54a0ff] bg-blue-50 dark:bg-blue-500/10'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/60'
                }`}>
              <Shield className="w-3.5 h-3.5" /> Admin
            </NavLink>
          )}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-1">
          <button onClick={toggle} aria-label="Toggle theme"
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
            {dark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>

          {user && (
            <button onClick={logout} title="Sign out"
              className="hidden sm:flex p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
              <LogOut className="w-[18px] h-[18px]" />
            </button>
          )}

          <button onClick={() => setOpen(p => !p)}
            className="sm:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden animate-slide-down border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0f1117] px-4 pb-4 pt-2 space-y-1">
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} end onClick={close}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl text-[15px] font-semibold transition-all ${
                  isActive
                    ? 'bg-orange-50 dark:bg-orange-500/10 text-[#FF7F50]'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}>
              {label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink to="/admin" onClick={close}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-3 rounded-xl text-[15px] font-semibold transition-all ${
                  isActive ? 'bg-blue-50 dark:bg-blue-500/10 text-[#54a0ff]' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}>
              <Shield className="w-4 h-4" /> Admin Panel
            </NavLink>
          )}
          {user && (
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
              <button onClick={() => { logout(); close() }}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[15px] font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10">
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
