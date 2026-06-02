import { BookMarked, Heart, Github, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10">

        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-display font-bold text-base text-brand-600 dark:text-brand-400">
              <div className="p-1.5 rounded-lg bg-brand-600 dark:bg-brand-500">
                <BookMarked className="w-3.5 h-3.5 text-white" />
              </div>
              Semesterly
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
              A free resource hub for engineering students. Notes, question papers and solved papers — all in one place.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
            <Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Browse</Link>
            <Link to="/about" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">About</Link>
            <a href="https://archive.org" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              Internet Archive <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Copyright notice — prominent */}
        <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40">
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            <span className="font-semibold">📢 Disclaimer:</span> All resources on Semesterly are collected from publicly available sources on the internet. We do not claim ownership of any document. This platform is a free aggregator built purely to help engineering students find study material easily in one place. If you are the original owner and wish to have your content removed, please contact us.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> for Engineering Students
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} Semesterly · Free forever · No ads
          </p>
        </div>
      </div>
    </footer>
  )
}
