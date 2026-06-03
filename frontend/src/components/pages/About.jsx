import { BookOpen, Heart, Shield, Zap, Globe, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

const FEATURES = [
  { icon: Zap,    color: 'bg-amber-50 dark:bg-amber-500/10 text-amber-500',    title: 'Instant access',      desc: 'No login, no signup. Open any resource in one click.' },
  { icon: Globe,  color: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500', title: 'Always free',      desc: 'No ads, no paywalls, no subscriptions — ever.' },
  { icon: Shield, color: 'bg-sky-50 dark:bg-sky-500/10 text-sky-500',          title: 'Public sources only', desc: 'All resources from publicly available internet sources.' },
  { icon: Users,  color: 'bg-violet-50 dark:bg-violet-500/10 text-violet-500', title: 'Built for students',  desc: 'Made by an engineering student who needed this.' },
]

export default function About() {
  return (
    <div className="max-w-2xl mx-auto space-y-12 py-6 animate-fade-up">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-3xl bg-primary-500 flex items-center justify-center shadow-glow">
            <BookOpen className="w-8 h-8 text-white" strokeWidth={2} />
          </div>
        </div>
        <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">About Semesterly</h1>
        <p className="text-gray-400 leading-relaxed">
          Semesterly is a free resource hub for engineering students. One place for notes, question papers, and solved papers — no hunting across WhatsApp groups, Telegram channels, or random websites.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FEATURES.map(f => (
          <div key={f.title} className="bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-gray-800 rounded-2xl p-5 space-y-3 shadow-card">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${f.color}`}>
              <f.icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100">{f.title}</h3>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/20 rounded-2xl p-6 space-y-3">
        <h3 className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
          <Shield className="w-4 h-4" /> Copyright Disclaimer
        </h3>
        <p className="text-sm text-amber-700/80 dark:text-amber-400/80 leading-relaxed">
          All resources on Semesterly are collected from publicly available sources. We do not host, own, or claim copyright over any documents. This platform is a free link organiser — we store URLs and metadata only. All credit goes to original authors and institutions.
        </p>
        <p className="text-sm text-amber-700/80 dark:text-amber-400/80">
          If you're the original owner and want your content removed, please contact us and we'll remove it immediately.
        </p>
      </div>

      <div className="text-center">
        <Link to="/" className="btn-primary px-8 py-3 text-base rounded-2xl">
          Browse Resources
        </Link>
        <p className="text-xs text-gray-400 mt-4 flex items-center justify-center gap-1.5">
          Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Engineering Students
        </p>
      </div>
    </div>
  )
}
