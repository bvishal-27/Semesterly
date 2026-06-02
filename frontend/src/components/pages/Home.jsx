import { useState } from 'react'
import { Search, X, SlidersHorizontal, BookOpen, FileText, CheckCircle2 } from 'lucide-react'
import ResourceCard from '../ui/ResourceCard'
import Spinner      from '../ui/Spinner'
import EmptyState   from '../ui/EmptyState'
import StatsBar     from '../ui/StatsBar'
import BranchGrid   from '../ui/BranchGrid'
import { useResources, useDebounce } from '../../hooks/useResources'

const TYPES = [
  { key: 'all',    label: 'All types' },
  { key: 'notes',  label: 'Notes',    Icon: BookOpen },
  { key: 'qpaper', label: 'Q-Papers', Icon: FileText },
  { key: 'solved', label: 'Solved',   Icon: CheckCircle2 },
]
const SEMS = ['All', 1, 2, 3, 4, 5, 6, 7, 8]
const PAGE_SIZE = 12

export default function Home() {
  const [search, setSearch]     = useState('')
  const [type, setType]         = useState('all')
  const [semester, setSemester] = useState('All')
  const [branch, setBranch]     = useState('all')
  const [page, setPage]         = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  const q = useDebounce(search)
  const filters = { limit: PAGE_SIZE, page }
  if (q)               filters.search   = q
  if (type !== 'all')  filters.type     = type
  if (semester !== 'All') filters.semester = semester
  if (branch !== 'all')   filters.branch   = branch

  const { resources, loading, error, total, pages } = useResources(filters)

  const set = (fn, val) => { fn(val); setPage(1) }
  const clearAll = () => { setSearch(''); setType('all'); setSemester('All'); setBranch('all'); setPage(1) }
  const hasFilters = q || type !== 'all' || semester !== 'All' || branch !== 'all'

  return (
    <div className="space-y-8">

      {/* ── Hero ── */}
      <section className="text-center space-y-4 pt-4 pb-2 animate-fade-up">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-50 dark:bg-ink-900/20 border border-ink-200 dark:border-ink-800/40 text-xs font-semibold text-ink-600 dark:text-ink-400">
          📚 Free for all engineering students
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-stone-50 leading-tight tracking-tight">
          All your study resources,<br />
          <span className="text-ink-500 dark:text-ink-400">in one place.</span>
        </h1>
        <p className="text-stone-500 dark:text-stone-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          Notes · Q-Papers · Solved Papers — instantly accessible, no login needed.
        </p>
      </section>

      {/* ── Stats ── */}
      <StatsBar />

      {/* ── Search ── */}
      <div className="relative max-w-2xl mx-auto animate-fade-up" style={{animationDelay:'0.1s'}}>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
        <input className="field pl-11 pr-10 py-3.5 text-sm sm:text-base rounded-2xl shadow-sm"
          placeholder="Search subject name or code — e.g. BCS401, DBMS, Algorithms…"
          value={search}
          onChange={e => set(setSearch, e.target.value)}
        />
        {search && (
          <button onClick={() => set(setSearch, '')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-stone-400 hover:text-stone-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ── Branch grid ── */}
      <div className="animate-fade-up" style={{animationDelay:'0.12s'}}>
        <BranchGrid selected={branch} onSelect={b => set(setBranch, b)} />
      </div>

      {/* ── Filters ── */}
      <div className="space-y-3 animate-fade-up" style={{animationDelay:'0.14s'}}>

        {/* Mobile toggle */}
        <div className="flex items-center justify-between sm:hidden">
          <button onClick={() => setShowFilters(p => !p)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-semibold transition-all
              ${showFilters
                ? 'bg-ink-50 dark:bg-ink-900/20 border-ink-300 dark:border-ink-700 text-ink-600 dark:text-ink-400'
                : 'bg-white dark:bg-canvas-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
              }`}>
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters
            {hasFilters && <span className="w-2 h-2 rounded-full bg-ink-500" />}
          </button>
          {hasFilters && (
            <button onClick={clearAll} className="text-xs font-semibold text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors">
              <X className="w-3 h-3" /> Clear all
            </button>
          )}
        </div>

        {/* Filter rows — always visible on desktop */}
        <div className={`${showFilters ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row gap-3 sm:items-center flex-wrap`}>

          {/* Type */}
          <div className="flex gap-1.5 flex-wrap">
            {TYPES.map(({ key, label, Icon }) => (
              <button key={key} onClick={() => set(setType, key)}
                className={`pill ${type === key ? 'pill-active' : 'pill-inactive'} flex items-center gap-1.5`}>
                {Icon && <Icon className="w-3 h-3" />}
                {label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-6 bg-stone-200 dark:bg-stone-700" />

          {/* Semester */}
          <div className="flex gap-1.5 flex-wrap">
            {SEMS.map(s => (
              <button key={s} onClick={() => set(setSemester, s)}
                className={`pill ${semester === s ? 'pill-active' : 'pill-inactive'}`}>
                {s === 'All' ? 'All sem' : `S${s}`}
              </button>
            ))}
          </div>

          {/* Desktop clear */}
          {hasFilters && (
            <button onClick={clearAll}
              className="hidden sm:flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-600 px-3 py-1.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-all">
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Result count ── */}
      {!loading && !error && (
        <p className="text-xs font-medium text-stone-400 dark:text-stone-500 -mt-4">
          {total ?? resources.length} result{(total ?? resources.length) !== 1 ? 's' : ''}
          {branch !== 'all' && ` in ${branch}`}
          {pages > 1 && ` · page ${page} of ${pages}`}
        </p>
      )}

      {/* ── Resource grid ── */}
      {loading ? (
        <div className="flex justify-center py-20"><Spinner size="lg" /></div>
      ) : error ? (
        <EmptyState title="Something went wrong" desc={error} />
      ) : resources.length === 0 ? (
        <EmptyState title="No resources found" desc="Try a different branch, semester, or search term." />
      ) : (
        <>
          <div className="card-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {resources.map(r => <ResourceCard key={r._id} resource={r} />)}
          </div>

          {pages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4 pb-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                className="btn-outline py-2 px-4 text-xs disabled:opacity-40 disabled:cursor-not-allowed">
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
                          ? 'bg-ink-500 text-white shadow-sm'
                          : 'text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800'
                      }`}>{p}</button>
                  )
                })}
              </div>
              <button disabled={page === pages} onClick={() => setPage(p => p + 1)}
                className="btn-outline py-2 px-4 text-xs disabled:opacity-40 disabled:cursor-not-allowed">
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
