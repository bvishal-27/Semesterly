import { BookMarked, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-canvas-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

          {/* Brand col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-ink-500 flex items-center justify-center">
                <BookMarked className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-display font-bold text-stone-900 dark:text-stone-100">Semesterly</span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-500 leading-relaxed">
              Free study resources for engineering students. Notes, Q-papers, and solved papers — all in one place.
            </p>
          </div>

          {/* Links col */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest">Navigate</p>
            <div className="space-y-2">
              {[['/', 'Browse resources'], ['/about', 'About'], ['/login', 'Admin login']].map(([to, label]) => (
                <Link key={to} to={to}
                  className="block text-sm text-stone-500 dark:text-stone-400 hover:text-ink-600 dark:hover:text-ink-400 transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Disclaimer col */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest">Disclaimer</p>
            <p className="text-xs text-stone-500 dark:text-stone-500 leading-relaxed">
              All resources are collected from publicly available sources. We do not claim ownership of any document. Semesterly is a free organiser — not a host. Content belongs to original authors and institutions.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-stone-400 dark:text-stone-600 flex items-center gap-1.5">
            Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> for Engineering Students
          </p>
          <p className="text-xs text-stone-400 dark:text-stone-600">
            © {new Date().getFullYear()} Semesterly · No ads · Free forever
          </p>
        </div>
      </div>
    </footer>
  )
}
