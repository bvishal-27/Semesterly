import { BookOpen, Heart, Github } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-100 dark:border-gray-800/60 bg-white dark:bg-[#0a0c13]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-primary-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-[15px] tracking-tight text-gray-900 dark:text-white">Semesterly</span>
            </div>
            <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed">
              A free study resource hub for engineering students. Notes, Q-papers, and solved papers.
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-600 flex items-center gap-1.5">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for students
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Pages</p>
            <div className="space-y-2.5">
              {[['/', 'Browse'], ['/about', 'About'], ['/login', 'Admin Login']].map(([to, label]) => (
                <Link key={to} to={to}
                  className="block text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Disclaimer</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed">
              All resources are collected from publicly available sources. We don't claim ownership over any content — we only organise links to help students find materials faster.
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-600">
              If you're the original owner and want content removed, contact us.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400 dark:text-gray-600">© {new Date().getFullYear()} Semesterly · Free forever · No ads · No login needed</p>
          <p className="text-xs text-gray-300 dark:text-gray-700">All resources from public sources only</p>
        </div>
      </div>
    </footer>
  )
}
