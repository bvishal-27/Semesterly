import { useState } from 'react'
import { Search, X, BookOpen, FileText, CheckCircle2, SlidersHorizontal } from 'lucide-react'
import ResourceCard from '../ui/ResourceCard'
import Spinner      from '../ui/Spinner'
import EmptyState   from '../ui/EmptyState'
import StatsBar     from '../ui/StatsBar'
import BranchGrid   from '../ui/BranchGrid'
import { useResources, useDebounce } from '../../hooks/useResources'

const TYPES     = [
  { key: 'all',    label: 'All',      icon: null },
  { key: 'notes',  label: 'Notes',    icon: BookOpen },
  { key: 'qpaper', label: 'Q-Papers', icon: FileText },
  { key: 'solved', label: 'Solved',   icon: CheckCircle2 },
]
const SEMESTERS = ['All', 1, 2, 3, 4, 5, 6, 7, 8]
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
  if (q)                filters.search   = q
  if (type !== 'all')   filters.type     = type
  if (semester !== 'All') filters.semester = semester
  if (branch !== 'all') filters.branch   = branch

  const { resources, loading, error, total, pages } = useResources(filters)

  const reset = (setter, val) => { setter(val); setPage(1) }

  const clearAll = () => {
    setSearch(''); setType('all'); setSemester('All'); setBranch('all'); setPage(1)
  }

  const hasFilters = q || type !== 'all' || semester !== 'All' || branch !== 'all'

  return (
    <div className="space-y-6">

      {/* Hero */}
      <div className="text-center space-y-2 pt-2 pb-1 animate-fade-up">
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 leading-tight">
          All your study resources,<br className="hidden sm:block" />
          <span className="text-brand-600 dark:text-brand-400"> in one place.</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto">
          Notes · Q-Papers · Solved Papers — free, instant, no login needed.
        </p>
      </div>

      {/* Stats */}
      <StatsBar />

      {/* Search bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          className="input pl-11 pr-10 py-3 text-sm sm:text-base shadow-sm rounded-2xl"
          placeholder="Search subject name, code (e.g. BCS401, DBMS)…"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
        />
        {search && (
          <button onClick={() => { setSearch(''); setPage(1) }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Branch grid */}
      <BranchGrid selected={branch} onSelect={(b) => reset(setBranch, b)} />

      {/* Filter bar */}
      <div className="space-y-3">
        {/* Mobile: toggle filters button */}
        <div className="flex items-center justify-between sm:hidden">
          <button onClick={() => setShowFilters(p => !p)}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasFilters && <span className="w-2 h-2 rounded-full bg-brand-500 ml-0.5" />}
          </button>
          {hasFilters && (
            <button onClick={clearAll} className="text-xs text-red-500 font-medium flex items-center gap-1">
              <X className="w-3 h-3" /> Clear all
            </button>
          )}
        </div>

        {/* Desktop always visible / Mobile toggleable */}
        <div className={`${showFilters ? 'flex' : 'hidden'} sm:flex flex-wrap gap-2 items-center`}>
          {/* Type pills */}
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            {TYPES.map(t => {
              const Icon = t.icon
              return (
                <button key={t.key} onClick={() => reset(setType, t.key)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    type === t.key
                      ? 'bg-white dark:bg-gray-700 text-brand-600 dark:text-brand-400 shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}>
                  {Icon && <Icon className="w-3 h-3" />}
                  {t.label}
                </button>
              )
            })}
          </div>

          {/* Semester */}
          <div className="flex gap-1 flex-wrap">
            {SEMESTERS.map(s => (
              <button key={s} onClick={() => reset(setSemester, s)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  semester === s
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-brand-300 dark:hover:border-brand-700'
                }`}>
                {s === 'All' ? 'All Sem' : `S${s}`}
              </button>
            ))}
          </div>

          {/* Desktop clear */}
          {hasFilters && (
            <button onClick={clearAll}
              className="hidden sm:flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-semibold px-2.5 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Result count */}
      {!loading && !error && (
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {total ?? resources.length} result{(total ?? resources.length) !== 1 ? 's' : ''}
          {branch !== 'all' && ` in ${branch}`}
          {pages > 1 && ` · page ${page}/${pages}`}
        </p>
      )}

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : error ? (
        <EmptyState title="Something went wrong" desc={error} />
      ) : resources.length === 0 ? (
        <EmptyState title="No resources found" desc="Try a different branch, semester, or search term." />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {resources.map(r => <ResourceCard key={r._id} resource={r} />)}
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4 pb-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
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
                          ? 'bg-brand-600 text-white shadow-sm'
                          : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}>{p}</button>
                  )
                })}
              </div>
              <button disabled={page === pages} onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
