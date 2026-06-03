import { useStats } from '../../hooks/useResources'

const STATS = [
  { key: 'total',  label: 'Resources', color: '#FF7F50' },
  { key: 'notes',  label: 'Notes',     color: '#80ed99' },
  { key: 'qpaper', label: 'Q-Papers',  color: '#54a0ff' },
  { key: 'solved', label: 'Solved',    color: '#c56ef3' },
]

export default function StatsBar() {
  const { stats, loading } = useStats()
  if (loading || !stats) return null
  return (
    <div className="flex flex-wrap justify-center gap-3 animate-fade-in">
      {STATS.map(({ key, label, color }) => (
        <div key={key}
          className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-gray-800 shadow-sm">
          <span className="font-black text-2xl tracking-tight" style={{ color }}>{stats[key]}</span>
          <span className="text-xs font-semibold text-gray-400">{label}</span>
        </div>
      ))}
    </div>
  )
}
