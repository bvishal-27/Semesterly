import { useState } from 'react'
import { Plus, Trash2, RefreshCw, Pencil, X, Check, Search } from 'lucide-react'
import toast from 'react-hot-toast'
import { resourceService } from '../../services/resourceService'
import { useResources, useStats } from '../../hooks/useResources'
import Spinner from '../ui/Spinner'
import AnalyticsPanel from '../ui/AnalyticsPanel'

const EMPTY = { title:'', subject:'', branch:'CSE', semester:1, type:'notes', year:'', description:'', fileUrl:'' }
const BRANCHES = ['CSE','ECE','ME','CE','EEE','IT','OTHER']

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block">{label}</label>
      {children}
    </div>
  )
}

export default function Admin() {
  const [form, setForm]         = useState(EMPTY)
  const [editId, setEditId]     = useState(null)
  const [saving, setSaving]     = useState(false)
  const [tab, setTab]           = useState('list')
  const [searchQuery, setSearchQuery] = useState('')

  const { resources, loading, refetch } = useResources({ limit: 200 })
  const { stats } = useStats()

  const s = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const startEdit = r => {
    setForm({ title:r.title, subject:r.subject, branch:r.branch, semester:r.semester,
              type:r.type, year:r.year||'', description:r.description||'', fileUrl:r.fileUrl })
    setEditId(r._id); setTab('add')
  }
  const cancel = () => { setForm(EMPTY); setEditId(null) }

  const submit = async e => {
    e.preventDefault(); setSaving(true)
    try {
      editId ? await resourceService.update(editId, form) : await resourceService.create(form)
      toast.success(editId ? 'Updated!' : 'Added!')
      setForm(EMPTY); setEditId(null); setTab('list'); refetch()
    } catch (err) { toast.error(err.response?.data?.message || 'Failed') }
    finally { setSaving(false) }
  }

  const remove = async id => {
    if (!confirm('Delete this resource?')) return
    try { await resourceService.delete(id); toast.success('Deleted'); refetch() }
    catch { toast.error('Delete failed') }
  }

  // Filter resources by search
  const filtered = resources.filter(r => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return r.title.toLowerCase().includes(q)
      || r.subject.toLowerCase().includes(q)
      || r.branch.toLowerCase().includes(q)
  })

  const TABS = [
    { key:'list',      label:'Resources' },
    { key:'add',       label: editId ? 'Edit' : 'Add' },
    { key:'analytics', label:'Analytics' },
  ]

  return (
    <div className="space-y-6 max-w-4xl">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Admin Panel</h1>
        <button onClick={refetch} className="btn-secondary py-2 text-xs"><RefreshCw className="w-3.5 h-3.5" /> Refresh</button>
      </div>

      {/* Stats strip */}
      {stats && (
        <div className="grid grid-cols-5 gap-2">
          {[['Total',stats.total,'#FF7F50'],['Notes',stats.notes,'#80ed99'],
            ['Q-Papers',stats.qpaper,'#54a0ff'],['Solved',stats.solved,'#c56ef3'],
            ['Opens',stats.views,'#fd79a8']].map(([label,value,color]) => (
            <div key={label} className="bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-gray-800 rounded-2xl p-3 text-center shadow-sm">
              <p className="font-black text-2xl tracking-tight" style={{color}}>{value}</p>
              <p className="text-[11px] font-bold text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800/60 p-1 rounded-xl w-fit">
        {TABS.map(({ key, label }) => (
          <button key={key} onClick={() => { setTab(key); if (key==='list') cancel() }}
            className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${
              tab===key
                ? 'bg-white dark:bg-gray-700 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-800'
            }`}
            style={tab===key ? { color:'#FF7F50' } : {}}>
            {label}
          </button>
        ))}
      </div>

      {/* ── ANALYTICS TAB ── */}
      {tab === 'analytics' && <AnalyticsPanel />}

      {/* ── ADD/EDIT TAB ── */}
      {tab === 'add' && (
        <div className="bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-6 space-y-5 animate-fade-in">
          <div className="flex items-center justify-between">
            <h2 className="font-black text-gray-900 dark:text-white">{editId ? 'Edit Resource' : 'Add New Resource'}</h2>
            {editId && <button onClick={cancel} className="text-xs font-bold text-gray-400 hover:text-gray-600 flex items-center gap-1"><X className="w-3 h-3"/>Cancel</button>}
          </div>
          <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Title *"><input className="field font-semibold" required placeholder="e.g. Data Structures Notes" value={form.title} onChange={e=>s('title',e.target.value)}/></Field>
            <Field label="Subject / Code *"><input className="field font-semibold" required placeholder="e.g. BCS301 / DBMS" value={form.subject} onChange={e=>s('subject',e.target.value)}/></Field>
            <Field label="Branch"><select className="field font-semibold" value={form.branch} onChange={e=>s('branch',e.target.value)}>{BRANCHES.map(b=><option key={b}>{b}</option>)}</select></Field>
            <Field label="Semester"><select className="field font-semibold" value={form.semester} onChange={e=>s('semester',+e.target.value)}>{[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>Semester {n}</option>)}</select></Field>
            <Field label="Type"><select className="field font-semibold" value={form.type} onChange={e=>s('type',e.target.value)}><option value="notes">Notes</option><option value="qpaper">Q-Paper</option><option value="solved">Solved Paper</option></select></Field>
            <Field label="Year"><input className="field font-semibold" placeholder="e.g. Dec2024/Jan2025" value={form.year} onChange={e=>s('year',e.target.value)}/></Field>
            <div className="sm:col-span-2">
              <Field label="File URL *"><input className="field font-semibold" required type="url" placeholder="https://ik.imagekit.io/... or archive.org/..." value={form.fileUrl} onChange={e=>s('fileUrl',e.target.value)}/></Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Description"><textarea className="field font-semibold resize-none" rows={2} placeholder="Brief description (optional)" value={form.description} onChange={e=>s('description',e.target.value)}/></Field>
            </div>
            <div className="sm:col-span-2 flex gap-2">
              <button type="submit" disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-black shadow-sm active:scale-95 transition-all"
                style={{ background:'linear-gradient(135deg,#FF7F50,#54a0ff)' }}>
                {saving ? <Spinner size="sm"/> : editId ? <><Check className="w-4 h-4"/>Save changes</> : <><Plus className="w-4 h-4"/>Add resource</>}
              </button>
              {editId && <button type="button" onClick={cancel} className="btn-secondary">Cancel</button>}
            </div>
          </form>
        </div>
      )}

      {/* ── LIST TAB ── */}
      {tab === 'list' && (
        <div className="space-y-3 animate-fade-in">
          {/* Search bar for admin */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              className="field pl-11 font-semibold"
              placeholder="Search resources by title, subject, or branch…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 py-3.5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h2 className="font-black text-sm text-gray-900 dark:text-white">
                {searchQuery ? `${filtered.length} results` : `All resources (${resources.length})`}
              </h2>
              <button onClick={() => setTab('add')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white text-xs font-black"
                style={{ background:'linear-gradient(135deg,#FF7F50,#54a0ff)' }}>
                <Plus className="w-3.5 h-3.5"/>Add new
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-10"><Spinner /></div>
            ) : (
              <div className="divide-y divide-gray-50 dark:divide-gray-800/60">
                {filtered.length === 0 && (
                  <p className="px-5 py-10 text-sm font-bold text-gray-400 text-center">
                    {searchQuery ? 'No matching resources.' : 'No resources yet.'}
                  </p>
                )}
                {filtered.map(r => (
                  <div key={r._id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/60 dark:hover:bg-gray-800/30 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate">{r.title}</p>
                      <p className="text-[11px] font-mono font-semibold text-gray-400 mt-0.5">
                        {r.subject} · Sem {r.semester} · {r.branch} · <span className="capitalize">{r.type}</span>
                        {r.year ? ` · ${r.year}` : ''}
                        <span className="ml-2 text-gray-300 dark:text-gray-600">{r.views} opens</span>
                      </p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button onClick={() => startEdit(r)}
                        className="p-2 rounded-xl text-gray-400 hover:text-[#54a0ff] hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all">
                        <Pencil className="w-3.5 h-3.5"/>
                      </button>
                      <button onClick={() => remove(r._id)}
                        className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all">
                        <Trash2 className="w-3.5 h-3.5"/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
