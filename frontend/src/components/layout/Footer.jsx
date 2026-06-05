import { BookOpen, Heart, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-100 dark:border-gray-800/60 bg-white dark:bg-[#0a0c13]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#FF7F50,#54a0ff)' }}>
                <BookOpen className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-black text-[15px] text-gray-900 dark:text-white">Semesterly</span>
            </div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
              Free notes, Q-papers & solved papers for engineering students. No login. No ads. No nonsense.
            </p>
            <p className="text-xs font-medium text-gray-400 dark:text-gray-600 flex items-center gap-1.5">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for students, by a student
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <p className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Quick Links</p>
            <div className="space-y-2.5">
              {[['/', 'Browse Resources'], ['/about', 'About Semesterly']].map(([to, label]) => (
                <Link key={to} to={to}
                  className="block text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-[#FF7F50] transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="space-y-4">
            <p className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
              <Shield className="w-3 h-3" /> Disclaimer
            </p>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
              All resources are collected from publicly available internet sources. We do not own or host any content — we only organise links to help students.
            </p>
            
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs font-bold text-gray-400 dark:text-gray-600">
            © {new Date().getFullYear()} Semesterly · Free forever · No ads · Open to all students
          </p>
          <p className="text-xs font-semibold text-gray-300 dark:text-gray-700">
            All content sourced from public internet resources only
          </p>
        </div>
      </div>
    </footer>
  )
}
