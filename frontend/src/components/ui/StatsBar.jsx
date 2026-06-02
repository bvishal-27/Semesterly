import { BookOpen, FileText, CheckCircle2, Layers, Eye } from 'lucide-react'
import { useStats } from '../../hooks/useResources'

function Stat({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-surface-800 border border-gray-100 dark:border-gray-800 shadow-sm">
      <div className={`p-1.5 rounded-lg ${color}`}>
        <Icon className="w-3.5 h-3.5" />
      </div>
      <div>
        <p className="font-display font-bold text-sm text-gray-900 dark:text-gray-100 leading-none">
          {value ?? '—'}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 leading-none mt-0.5">{label}</p>
      </div>
    </div>
  )
}

export default function StatsBar() {
  const { stats, loading } = useStats()
  if (loading || !stats) return null

  return (
    <div className="flex flex-wrap gap-2 justify-center animate-fade-in">
      <Stat icon={Layers}       label="Resources"  value={stats.total}    color="bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400" />
      <Stat icon={BookOpen}     label="Notes"      value={stats.notes}    color="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" />
      <Stat icon={FileText}     label="Q-Papers"   value={stats.qpaper}   color="bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" />
      <Stat icon={CheckCircle2} label="Solved"     value={stats.solved}   color="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" />
      <Stat icon={Eye}          label="Total views" value={stats.views}   color="bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" />
    </div>
  )
}
