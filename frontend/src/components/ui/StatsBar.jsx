import { useStats } from '../../hooks/useResources'

function StatChip({ label, value, accent }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-canvas-800 border border-stone-200/80 dark:border-stone-800 shadow-sm`}>
      <div className={`w-2 h-8 rounded-full ${accent}`} />
      <div>
        <p className="font-display font-bold text-lg leading-none text-stone-900 dark:text-stone-100">{value ?? '—'}</p>
        <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5 font-medium">{label}</p>
      </div>
    </div>
  )
}

export default function StatsBar() {
  const { stats, loading } = useStats()
  if (loading || !stats) return null

  return (
    <div className="flex flex-wrap gap-2 animate-fade-in">
      <StatChip label="Total"    value={stats.total}  accent="bg-ink-400" />
      <StatChip label="Notes"    value={stats.notes}  accent="bg-emerald-400" />
      <StatChip label="Q-Papers" value={stats.qpaper} accent="bg-amber-400" />
      <StatChip label="Solved"   value={stats.solved} accent="bg-sky-400" />
      {stats.views > 0 && <StatChip label="Views" value={stats.views} accent="bg-rose-400" />}
    </div>
  )
}
