import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Sun, Moon, BookMarked, LogOut, Shield, Menu, X } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { dark, toggle } = useTheme()
  const { user, logout, isAdmin } = useAuth()
  const [open, setOpen] = useState(false)

  const links = [
    ['/', 'Browse'],
    ['/about', 'About'],
    ...(isAdmin ? [['/admin', 'Admin']] : []),
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg border-b border-gray-200/60 dark:border-gray-800/60 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-3">

        {/* Brand */}
        <Link to="/" onClick={() => setOpen(false)}
          className="flex items-center gap-2 font-display font-bold text-base text-brand-600 dark:text-brand-400 shrink-0">
          <div className="p-1.5 rounded-lg bg-brand-600 dark:bg-brand-500">
            <BookMarked className="w-3.5 h-3.5 text-white" />
          </div>
          Semesterly
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1 flex-1 justify-center">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
            >
              {label === 'Admin' ? <span className="flex items-center gap-1"><Shield className="w-3 h-3" />{label}</span> : label}
            </NavLink>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-1.5">
          <button onClick={toggle}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {user ? (
            <button onClick={logout}
              className="hidden sm:flex p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          ) : (
            <Link to="/login" className="hidden sm:flex btn-primary py-1.5 px-3 text-xs">Sign in</Link>
          )}

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(p => !p)}
            className="sm:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-3 space-y-1 animate-fade-in">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}>
              {label}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            {user ? (
              <button onClick={() => { logout(); setOpen(false) }}
                className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-medium bg-brand-600 text-white">
                Sign in as Admin
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
