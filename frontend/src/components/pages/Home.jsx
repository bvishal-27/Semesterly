import { useState, useRef } from 'react'
import { Search, X, BookOpen, FileText, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'
import ResourceCard from '../ui/ResourceCard'
import Spinner      from '../ui/Spinner'
import EmptyState   from '../ui/EmptyState'
import StatsBar     from '../ui/StatsBar'
import BranchGrid   from '../ui/BranchGrid'
import VisitorBadge from '../ui/VisitorBadge'
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
  const [browsing, setBrowsing] = useState(false)
  const resultsRef = useRef(null)

  const scrollToResults = () => {
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const q = useDebounce(search)
  const shouldFetch = browsing || q.length > 0

  const filters = { limit: PAGE_SIZE, page }
  if (q)                  filters.search   = q
  if (type !== 'all')     filters.type     = type
  if (semester !== 'All') filters.semester = semester
  if (branch !== 'all')   filters.branch   = branch

  const { resources, loading, error, total, pages } = useResources(shouldFetch ? filters : null)

  const set = (fn, v) => { fn(v); setPage(1) }
  const clearAll = () => { setSearch(''); setType('all'); setSemester('All'); setBranch('all'); setPage(1); setBrowsing(false) }
  const hasFilters = q || type !== 'all' || semester !== 'All' || branch !== 'all'

  const handleBranchSelect = (b) => { set(setBranch, b); if (b !== 'all') setBrowsing(true) }
  const handleSearch = (v) => { set(setSearch, v); if (v.length > 0) setBrowsing(true) }

  return (
    <div className="space-y-10">

      {/* ── Hero ──────────────────────────────── */}
      <section className="text-center space-y-6 pt-8 pb-2 animate-fade-up">

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold"
          style={{ background:'rgba(84,160,255,0.1)', borderColor:'rgba(84,160,255,0.2)', color:'#54a0ff' }}>
          <Sparkles className="w-3.5 h-3.5" />
          100% Free for Engineering Students
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.08]">
            Everything You Need to<br />
            <span className="relative"
              style={{ background:'linear-gradient(90deg,#FF7F50 0%,#54a0ff 60%,#80ed99 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              Ace Your Semester.
            </span>
          </h1>
          <p className="text-lg sm:text-xl font-bold text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
            Stop Searching. Start Scoring.<br />
            <span className="text-gray-400 dark:text-gray-500 font-semibold text-base">Notes, PYQs & Solved Papers — all in one place.</span>
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            className="field pl-11 pr-10 py-4 text-[15px] rounded-2xl shadow-sm font-semibold"
            placeholder="Search subject or code — BCS401, DBMS, OS…"
            value={search}
            onChange={e => handleSearch(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.target.blur()
                setBrowsing(true)
                scrollToResults()
              }
            }}
          />
          {search && (
            <button onClick={clearAll}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <StatsBar />
        <VisitorBadge />
      </section>
    

      {/* ── Branch grid ───────────────────────── */}
      <BranchGrid selected={branch} onSelect={handleBranchSelect} />

      {/* ── Landing state ─────────────────────── */}
      {!shouldFetch && (
        <div className="animate-fade-up space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { emoji:'📖', title:'Notes',        desc:'Unit-wise notes for every subject',   color:'#FF7F50', type:'notes'  },
              { emoji:'📝', title:'Q-Papers',     desc:'Previous year question papers (PYQs)', color:'#54a0ff', type:'qpaper' },
              { emoji:'✅', title:'Solved Papers', desc:'PYQs with complete solutions',         color:'#80ed99', type:'solved' },
            ].map(c => (
              <button key={c.title}
                onClick={() => { set(setType, c.type); setBrowsing(true) }}
                className="group text-left p-6 rounded-3xl border-2 border-transparent hover:-translate-y-1 hover:shadow-xl active:scale-95 transition-all duration-200"
                style={{ background:`linear-gradient(135deg,${c.color}18,${c.color}35)`, borderColor:`${c.color}30` }}>
                <span className="text-3xl">{c.emoji}</span>
                <h3 className="font-black text-xl text-gray-900 dark:text-white mt-3 tracking-tight">{c.title}</h3>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{c.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-xs font-black"
                  style={{ color: c.color }}>
                  Browse all <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>

          <div className="text-center">
            <button onClick={() => setBrowsing(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-white text-sm shadow-lg hover:scale-105 active:scale-95 transition-all"
              style={{ background:'linear-gradient(135deg,#FF7F50,#54a0ff)' }}>
              Browse All Resources <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── Filters ───────────────────────────── */}
      {shouldFetch && (
        <div ref={resultsRef} className="space-y-3 animate-fade-in">
          <div className="flex flex-wrap gap-2 items-center">
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
                className="ml-auto flex items-center gap-1 text-xs font-bold text-red-400 hover:text-red-500 px-3 py-1.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-all">
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          {!loading && !error && (
            <p className="text-xs font-bold text-gray-400">
              {total ?? resources.length} resource{(total ?? resources.length) !== 1 ? 's' : ''}
              {branch !== 'all' && ` in ${branch}`}
              {pages > 1 && ` · page ${page}/${pages}`}
            </p>
          )}
        </div>
      )}

      {/* ── Grid ──────────────────────────────── */}
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
                  <button disabled={page===1} onClick={() => setPage(p=>p-1)}
                    className="btn-secondary py-2 px-5 text-xs disabled:opacity-40 disabled:cursor-not-allowed">← Prev</button>
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(pages,5) }, (_,i) => {
                      const p = page<=3 ? i+1 : page-2+i
                      if (p<1||p>pages) return null
                      return (
                        <button key={p} onClick={() => setPage(p)}
                          className={`w-9 h-9 rounded-xl text-xs font-black transition-all ${p===page ? 'text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                          style={p===page ? { background:'linear-gradient(135deg,#FF7F50,#54a0ff)' } : {}}>
                          {p}
                        </button>
                      )
                    })}
                  </div>
                  <button disabled={page===pages} onClick={() => setPage(p=>p+1)}
                    className="btn-secondary py-2 px-5 text-xs disabled:opacity-40 disabled:cursor-not-allowed">Next →</button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}