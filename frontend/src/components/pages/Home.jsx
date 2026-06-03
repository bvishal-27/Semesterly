import { useState } from 'react'
import { Search, X, BookOpen, FileText, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'
import ResourceCard from '../ui/ResourceCard'
import Spinner      from '../ui/Spinner'
import EmptyState   from '../ui/EmptyState'
import StatsBar     from '../ui/StatsBar'
import BranchGrid   from '../ui/BranchGrid'
import { useResources, useDebounce } from '../../hooks/useResources'

const TYPES = [
  { key: 'all',    label: 'All' },
  { key: 'notes',  label: 'Notes',    Icon: BookOpen },
  { key: 'qpaper', label: 'Q-Papers', Icon: FileText },
  { key: 'solved', label: 'Solved',   Icon: CheckCircle2 },
]
const SEMS = ['All', 1, 2, 3, 4, 5, 6, 7, 8]
const PAGE_SIZE = 9

export default function Home() {
  const [search, setSearch]     = useState('')
  const [type, setType]         = useState('all')
  const [semester, setSemester] = useState('All')
  const [branch, setBranch]     = useState('all')
  const [page, setPage]         = useState(1)
  const [browsing, setBrowsing] = useState(false) // controls whether to show cards

  const q = useDebounce(search)

  // Only fetch if user has started browsing
  const shouldFetch = browsing || q.length > 0

  const filters = { limit: PAGE_SIZE, page }
  if (q)                  filters.search   = q
  if (type !== 'all')     filters.type     = type
  if (semester !== 'All') filters.semester = semester
  if (branch !== 'all')   filters.branch   = branch

  const { resources, loading, error, total, pages } = useResources(
    shouldFetch ? filters : null
  )

  const set = (fn, v) => { fn(v); setPage(1) }
  const clearAll = () => {
    setSearch(''); setType('all'); setSemester('All')
    setBranch('all'); setPage(1); setBrowsing(false)
  }
  const hasFilters = q || type !== 'all' || semester !== 'All' || branch !== 'all'

  const handleBranchSelect = (b) => {
    set(setBranch, b)
    if (b !== 'all') setBrowsing(true)
    else if (!q) setBrowsing(false)
  }

  const handleSearch = (v) => {
    set(setSearch, v)
    if (v.length > 0) setBrowsing(true)
  }

  const handleBrowseAll = () => setBrowsing(true)

  return (
    <div className="space-y-10">

      {/* ── Hero ─────────────────────────────── */}
      <section className="text-center space-y-6 pt-8 pb-4 animate-fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#54a0ff]/10 border border-[#54a0ff]/20 text-xs font-semibold text-[#54a0ff]">
          <Sparkles className="w-3.5 h-3.5" />
          Free for all engineering students
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.08]">
            Find your notes,<br />
            <span style={{ background: 'linear-gradient(90deg,#FF7F50,#54a0ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              ace your semester.
            </span>
          </h1>
          <p className="text-base text-gray-400 max-w-md mx-auto font-medium leading-relaxed">
            Notes · Q-Papers · Solved Papers — all branches, all semesters, completely free.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            className="field pl-11 pr-10 py-4 text-[15px] rounded-2xl shadow-sm"
            placeholder="Search subject name or code — BCS401, DBMS…"
            value={search}
            onChange={e => handleSearch(e.target.value)}
          />
          {search && (
            <button onClick={clearAll}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Stats */}
        <StatsBar />
      </section>

      {/* ── Branch grid ──────────────────────── */}
      <BranchGrid selected={branch} onSelect={handleBranchSelect} />

      {/* ── Landing state — before user browses ── */}
      {!shouldFetch && (
        <div className="animate-fade-up space-y-8">

          {/* CTA cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { emoji:'📖', title:'Notes', desc:'Unit-wise notes for every subject', color:'#FF7F50', onClick:()=>{ set(setType,'notes'); setBrowsing(true) } },
              { emoji:'📝', title:'Q-Papers', desc:'Previous year question papers', color:'#54a0ff', onClick:()=>{ set(setType,'qpaper'); setBrowsing(true) } },
              { emoji:'✅', title:'Solved Papers', desc:'Q-papers with full solutions', color:'#80ed99', onClick:()=>{ set(setType,'solved'); setBrowsing(true) } },
            ].map(c => (
              <button key={c.title} onClick={c.onClick}
                className="group text-left p-6 rounded-3xl border-2 border-transparent hover:border-white/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl active:scale-95"
                style={{ background:`linear-gradient(135deg,${c.color}22,${c.color}44)` }}>
                <span className="text-3xl">{c.emoji}</span>
                <h3 className="font-black text-lg text-gray-900 dark:text-white mt-3 tracking-tight">{c.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{c.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-xs font-bold"
                  style={{ color: c.color }}>
                  Browse <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>

          {/* Browse all button */}
          <div className="text-center">
            <button onClick={handleBrowseAll}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-white text-sm transition-all hover:scale-105 active:scale-95 shadow-lg"
              style={{ background:'linear-gradient(135deg,#FF7F50,#54a0ff)' }}>
              Browse all resources
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── Filters — only when browsing ─────── */}
      {shouldFetch && (
        <div className="space-y-4 animate-fade-in">

          {/* Filter row */}
          <div className="flex flex-wrap gap-2 items-center">
            {/* Type */}
            <div className="flex gap-1.5 flex-wrap">
              {TYPES.map(({ key, label, Icon }) => (
                <button key={key} onClick={() => set(setType, key)}
                  className={`pill ${type === key ? 'pill-on' : 'pill-off'}`}>
                  {Icon && <Icon className="w-3 h-3" />}
                  {label}
                </button>
              ))}
            </div>

            <div className="hidden sm:block h-5 w-px bg-gray-200 dark:bg-gray-700" />

            {/* Semester */}
            <div className="flex gap-1.5 flex-wrap">
              {SEMS.map(s => (
                <button key={s} onClick={() => set(setSemester, s)}
                  className={`pill ${semester === s ? 'pill-on' : 'pill-off'}`}>
                  {s === 'All' ? 'All sem' : `S${s}`}
                </button>
              ))}
            </div>

            {hasFilters && (
              <button onClick={clearAll}
                className="flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-500 px-3 py-1.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-all ml-auto">
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          {/* Count */}
          {!loading && !error && (
            <p className="text-xs font-semibold text-gray-400">
              {total ?? resources.length} resource{(total ?? resources.length) !== 1 ? 's' : ''}
              {branch !== 'all' && ` in ${branch}`}
              {pages > 1 && ` · page ${page}/${pages}`}
            </p>
          )}
        </div>
      )}

      {/* ── Cards grid ───────────────────────── */}
      {shouldFetch && (
        <>
          {loading ? (
            <div className="flex justify-center py-24"><Spinner size="lg" /></div>
          ) : error ? (
            <EmptyState title="Something went wrong" desc={error} />
          ) : resources.length === 0 ? (
            <EmptyState title="No resources found" desc="Try a different branch, semester, or search term." />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {resources.map((r, i) => <ResourceCard key={r._id} resource={r} index={i} />)}
              </div>

              {pages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4">
                  <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                    className="btn-secondary py-2 px-5 text-xs disabled:opacity-40 disabled:cursor-not-allowed">
                    ← Prev
                  </button>
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(pages, 5) }, (_, i) => {
                      const p = page <= 3 ? i + 1 : page - 2 + i
                      if (p < 1 || p > pages) return null
                      return (
                        <button key={p} onClick={() => setPage(p)}
                          className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                            p === page
                              ? 'text-white shadow-sm'
                              : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                          style={p === page ? { background:'linear-gradient(135deg,#FF7F50,#54a0ff)' } : {}}>
                          {p}
                        </button>
                      )
                    })}
                  </div>
                  <button disabled={page === pages} onClick={() => setPage(p => p + 1)}
                    className="btn-secondary py-2 px-5 text-xs disabled:opacity-40 disabled:cursor-not-allowed">
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
