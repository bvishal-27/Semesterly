import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Sun, Moon, BookOpen, Menu, X, Shield, LogOut } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { dark, toggle } = useTheme()
  const { user, logout, isAdmin } = useAuth()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const links = [
    { to: '/', label: 'Browse' },
    { to: '/about', label: 'About' },
    ...(isAdmin ? [{ to: '/admin', label: 'Admin', icon: Shield }] : []),
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0f1117]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[60px] gap-4">

        {/* Logo */}
        <Link to="/" onClick={close} className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 bg-primary-500 rounded-xl flex items-center justify-center shadow-sm">
            <BookOpen className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-[15px] tracking-tight text-gray-900 dark:text-white">
            Semesterly
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-0.5 flex-1 justify-center">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end className={({ isActive }) =>
              `flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 font-semibold'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/60'
              }`}>
              {Icon && <Icon className="w-3.5 h-3.5" />}
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-1">
          <button onClick={toggle}
            className="btn-ghost p-2 rounded-lg text-gray-400 dark:text-gray-500"
            aria-label="Toggle theme">
            {dark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>
          {user
            ? <button onClick={logout} className="hidden sm:flex btn-ghost p-2 rounded-lg" title="Sign out">
                <LogOut className="w-[18px] h-[18px] text-gray-400" />
              </button>
            : <Link to="/login" onClick={close} className="hidden sm:flex btn-primary py-2 px-4 text-[13px]">
                Sign in
              </Link>
          }
          <button onClick={() => setOpen(p => !p)}
            className="sm:hidden btn-ghost p-2 rounded-lg">
            {open ? <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  : <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden animate-slide-down border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0f1117] px-4 py-3 space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end onClick={close}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium transition-all ${
                  isActive
                    ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}>
              {Icon && <Icon className="w-4 h-4" />}
              {label}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            {user
              ? <button onClick={() => { logout(); close() }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[15px] font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10">
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              : <Link to="/login" onClick={close}
                  className="flex items-center justify-center w-full py-3 rounded-xl text-[15px] font-semibold bg-primary-500 text-white">
                  Admin Sign in
                </Link>
            }
          </div>
        </div>
      )}
    </header>
  )
}
