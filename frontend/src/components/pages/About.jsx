import { BookMarked, Heart, Shield, Zap, Globe, Github } from 'lucide-react'
import { Link } from 'react-router-dom'

const FEATURES = [
  { icon: Zap,    title: 'Instant access',     desc: 'No login needed for students. Find and open any resource in seconds.' },
  { icon: Globe,  title: 'Always free',         desc: 'Built on free infrastructure. No ads, no paywalls, no subscriptions.' },
  { icon: Shield, title: 'Public sources only', desc: 'All resources are from publicly available sources. We only organise them.' },
  { icon: Heart,  title: 'Made by students',    desc: 'Built by an engineering student who was tired of hunting for resources.' },
]

export default function About() {
  return (
    <div className="max-w-2xl mx-auto space-y-10 py-4 animate-fade-up">
      {/* Hero */}
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-900/30">
            <BookMarked className="w-8 h-8 text-brand-600 dark:text-brand-400" />
          </div>
        </div>
        <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-gray-50">About Semesterly</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
          Semesterly is a free resource hub for engineering students — built to make notes, question papers, and solved papers easy to find and access, without wasting time searching everywhere.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FEATURES.map(f => (
          <div key={f.title} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 space-y-2">
            <div className="p-2 w-fit rounded-xl bg-brand-50 dark:bg-brand-900/30">
              <f.icon className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            </div>
            <h3 className="font-display font-semibold text-sm text-gray-900 dark:text-gray-100">{f.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40 rounded-2xl p-5 space-y-2">
        <h3 className="font-display font-semibold text-sm text-amber-800 dark:text-amber-300 flex items-center gap-2">
          <Shield className="w-4 h-4" /> Copyright Disclaimer
        </h3>
        <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
          All resources listed on Semesterly are collected from publicly available sources on the internet. Semesterly does not host, own, or claim copyright over any of these materials. This platform acts purely as an organiser — we store links and metadata only. All credit goes to the original authors and institutions.
        </p>
        <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
          If you are the original owner of any content listed here and wish to have it removed, please reach out and we will remove it immediately.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center space-y-3">
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm transition-all shadow-sm active:scale-95">
          Browse Resources
        </Link>
        <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center justify-center gap-1">
          Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> for Engineering Students
        </p>
      </div>
    </div>
  )
}
