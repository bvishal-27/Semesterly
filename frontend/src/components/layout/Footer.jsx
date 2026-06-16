import { BookOpen, Heart, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import VisitorBadge from '../ui/VisitorBadge'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-100 dark:border-gray-800/60 bg-white dark:bg-[#0a0c13]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

        {/* Mobile: compact single column | Desktop: 3 columns */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#FF7F50,#54a0ff)' }}>
                <BookOpen className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-black text-sm text-gray-900 dark:text-white">Semesterly</span>
            </div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
              Free notes, Q-papers & solved papers. No login. No ads.
            </p>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for students
            </p>
            <VisitorBadge />
          </div>
          {/* Links */}
          <div className="space-y-3">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pages</p>
            <div className="space-y-2">
              {[['/', 'Browse'], ['/about', 'About']].map(([to, label]) => (
                <Link key={to} to={to}
                  className="block text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-[#FF7F50] transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
          {/* Disclaimer */}
          <div className="space-y-3">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
              <Shield className="w-3 h-3" /> Disclaimer
            </p>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
              All resources are from publicly available internet sources. We don't own or host any content.
            </p>
          </div>
        </div>

        {/* Mobile only — ultra compact */}
        <div className="sm:hidden space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#FF7F50,#54a0ff)' }}>
                <BookOpen className="w-3 h-3 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-black text-sm text-gray-900 dark:text-white">Semesterly</span>
            </div>
            <div className="flex gap-3">
              {[['/', 'Browse'], ['/about', 'About']].map(([to, label]) => (
                <Link key={to} to={to}
                  className="text-xs font-bold text-gray-500 hover:text-[#FF7F50] transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <p className="text-[11px] font-semibold text-gray-400 leading-relaxed">
            Free notes, Q-papers & solved papers for engineering students. All content from public sources.
          </p>
          <VisitorBadge />
        </div>

        {/* Bottom bar — both mobile and desktop */}
        <div className="mt-4 sm:mt-8 pt-4 border-t border-gray-100 dark:border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-1">
          <p className="text-[11px] font-bold text-gray-400 dark:text-gray-600">
            © {new Date().getFullYear()} Semesterly · Free forever · No ads
          </p>
          <p className="text-[11px] font-semibold text-gray-300 dark:text-gray-700 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> by students, for students.
          </p>
        </div>
      </div>
    </footer>
  )
}