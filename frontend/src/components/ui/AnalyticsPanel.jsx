import { useState, useEffect, useMemo } from 'react'
import { Eye, Users, TrendingUp, MousePointerClick, Calendar } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { analyticsService } from '../../services/resourceService'
import Spinner from './Spinner'

const RANGES = [
  { key: '7d',  label: '7 Days' },
  { key: '30d', label: '30 Days' },
  { key: '90d', label: '90 Days' },
  { key: '1y',  label: '1 Year' },
  { key: 'all', label: 'All Time' },
  { key: 'custom', label: 'Custom' },
]

function fmtMonth(ym) {
  // ym = "2026-06" -> "Jun 2026"
  const [y, m] = ym.split('-')
  const d = new Date(+y, +m - 1)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function AnalyticsPanel() {
  const [range, setRange]     = useState('30d')
  const [from, setFrom]       = useState('')
  const [to, setTo]           = useState('')
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    const params = range === 'custom' && from && to
      ? { from, to }
      : { range }
    analyticsService.getSummary(params)
      .then(({ data }) => setData(data))
      .catch(() => setData(null))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (range === 'custom' && (!from || !to)) return // wait for both dates
    load()
  }, [range, from, to])

  // Chart data — oldest to newest for line chart
  const chartData = useMemo(() => {
    if (!data) return []
    return data.daily.slice().reverse().map(d => ({
      date:  d.date.slice(5), // MM-DD
      views: d.views,
      unique: d.unique,
      opens: d.opens,
    }))
  }, [data])

  return (
    <div className="space-y-4 animate-fade-in">

      {/* Range selector */}
      <div className="flex flex-wrap items-center gap-2">
        {RANGES.map(r => (
          <button key={r.key} onClick={() => setRange(r.key)}
            className={`pill ${range === r.key ? 'pill-on' : 'pill-off'}`}>
            {r.key === 'custom' && <Calendar className="w-3 h-3" />}
            {r.label}
          </button>
        ))}
      </div>

      {/* Custom range pickers */}
      {range === 'custom' && (
        <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-gray-800 rounded-2xl p-3">
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-gray-400">From</label>
            <input type="date" value={from} onChange={e => setFrom(e.target.value)}
              className="field py-1.5 text-xs w-auto" />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-gray-400">To</label>
            <input type="date" value={to} onChange={e => setTo(e.target.value)}
              className="field py-1.5 text-xs w-auto" />
          </div>
          {(!from || !to) && (
            <span className="text-xs font-semibold text-gray-400">Pick both dates to load</span>
          )}
        </div>
      )}

      {loading || !data ? (
        <div className="flex justify-center py-12"><Spinner /></div>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Eye,                label: 'Total Visits',     value: data.totalViews,     color: '#54a0ff' },
              { icon: Users,              label: 'Unique Visitors',  value: data.uniqueVisitors, color: '#80ed99' },
              { icon: TrendingUp,         label: "Today's Visits",   value: data.todayViews,     color: '#FF7F50' },
              { icon: MousePointerClick,  label: 'Resources Opened', value: data.resourceOpens,  color: '#c56ef3' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4" style={{ color }} />
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">{label}</span>
                </div>
                <p className="font-black text-3xl tracking-tight" style={{ color }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Line chart */}
          {chartData.length > 0 && (
            <div className="bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
              <h3 className="font-black text-sm text-gray-900 dark:text-white mb-3">Visits Over Time</h3>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fontWeight: 600 }} stroke="#9ca3af" />
                  <YAxis tick={{ fontSize: 11, fontWeight: 600 }} stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12, fontWeight: 600, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, fontWeight: 700 }} />
                  <Line type="monotone" dataKey="views"  name="Visits"  stroke="#54a0ff" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="unique" name="Unique"  stroke="#80ed99" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="opens"  name="Opens"   stroke="#c56ef3" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Monthly table */}
          {data.monthly?.length > 0 && (
            <div className="bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-800">
                <h3 className="font-black text-sm text-gray-900 dark:text-white">Monthly Breakdown</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                      <th className="px-5 py-2.5">Month</th>
                      <th className="px-5 py-2.5 text-right">Visits</th>
                      <th className="px-5 py-2.5 text-right">Unique Visitors</th>
                      <th className="px-5 py-2.5 text-right">Resources Opened</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800/60">
                    {data.monthly.slice().reverse().map(m => (
                      <tr key={m.month} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                        <td className="px-5 py-2.5 font-bold text-gray-700 dark:text-gray-300">{fmtMonth(m.month)}</td>
                        <td className="px-5 py-2.5 text-right font-bold text-[#54a0ff]">{m.views}</td>
                        <td className="px-5 py-2.5 text-right font-bold text-[#80ed99]">{m.unique}</td>
                        <td className="px-5 py-2.5 text-right font-bold text-[#c56ef3]">{m.opens}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Daily table */}
          <div className="bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="font-black text-sm text-gray-900 dark:text-white">Daily Breakdown</h3>
<span className="text-[11px] font-bold text-gray-400">{data.range?.from} → {data.range?.to}</span>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-gray-800/60 max-h-80 overflow-y-auto">
              {data.daily.length === 0 && (
                <p className="px-5 py-8 text-sm font-bold text-gray-400 text-center">No data for this range.</p>
              )}
              {data.daily.map(d => (
                <div key={d.date} className="flex items-center justify-between px-5 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                  <span className="text-xs font-mono font-bold text-gray-500 dark:text-gray-400">{d.date}</span>
                  <div className="flex gap-4 sm:gap-6 text-xs font-bold">
                    <span className="text-[#54a0ff]">{d.views} visits</span>
                    <span className="text-[#80ed99]">{d.unique} unique</span>
                    <span className="text-[#c56ef3]">{d.opens} opens</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
