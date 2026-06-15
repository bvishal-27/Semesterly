import { useEffect, useState } from 'react'
import { analyticsService } from '../../services/resourceService'

export default function VisitorBadge() {
  const [count, setCount] = useState(null)

  useEffect(() => {
    analyticsService.getVisitors()
      .then(({ data }) => setCount(data.visitors))
      .catch(() => {})
  }, [])

  if (!count) return null

  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-white/5 border border-gray-200/60 dark:border-gray-700/40 backdrop-blur-sm">
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      <span className="text-xs font-black text-gray-500 dark:text-gray-400 tracking-wide">
        Visitors: <span className="text-gray-900 dark:text-white">{count.toLocaleString()}</span>
      </span>
    </div>
  )
}