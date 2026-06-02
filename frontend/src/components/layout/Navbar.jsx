import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Sun, Moon, BookMarked, LogOut, Shield, Menu, X } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { dark, toggle } = useTheme()
  const { user, logout, isAdmin } = useAuth()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const links = [['/', 'Browse'], ['/about', 'About'], ...(isAdmin ? [['/admin', 'Admin']] : [])]

  return (
    <header className="sticky top-0 z-50 bg-canvas-50/95 dark:bg-canvas-950/95 backdrop-blur-xl border-b border-stone-200/60 dark:border-stone-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between gap-4" style={{height:'60px'}}>

        {/* Brand */}
        <Link to="/" onClick={close} className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-ink-500 flex items-center justify-center shadow-sm">
            <BookMarked className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-base text-stone-900 dark:text-stone-100 tracking-tight">
            Semesterly
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden sm:flex items-center gap-0.5">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end
              className={({ isActive }) => `px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-ink-50 dark:bg-ink-900/20 text-ink-600 dark:text-ink-400'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100/60 dark:hover:bg-stone-800/50'
              }`}>
              {label === 'Admin'
                ? <span className="flex items-center gap-1.5"><Shield className="w-3 h-3" />{label}</span>
                : label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1">
          <button onClick={toggle} aria-label="Toggle theme"
            className="p-2 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {user
            ? <button onClick={logout} title="Sign out"
                className="hidden sm:flex p-2 rounded-xl text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                <LogOut className="w-4 h-4" />
              </button>
            : <Link to="/login" onClick={close}
                className="hidden sm:flex btn-primary py-2 px-4 text-xs rounded-xl">
                Admin login
              </Link>
          }

          <button onClick={() => setOpen(p => !p)}
            className="sm:hidden p-2 rounded-xl text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="sm:hidden animate-slide-down bg-canvas-50 dark:bg-canvas-950 border-b border-stone-200 dark:border-stone-800 px-4 pb-4 pt-2 space-y-1">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end onClick={close}
              className={({ isActive }) => `flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-ink-50 dark:bg-ink-900/20 text-ink-600 dark:text-ink-400'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}>
              {label}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
            {user
              ? <button onClick={() => { logout(); close() }}
                  className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              : <Link to="/login" onClick={close}
                  className="flex items-center justify-center w-full px-4 py-3 rounded-xl text-sm font-semibold bg-ink-500 text-white">
                  Admin Login
                </Link>
            }
          </div>
        </div>
      )}
    </header>
  )
}
