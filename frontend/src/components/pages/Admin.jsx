import { useState } from 'react'
import { Plus, Trash2, RefreshCw, Pencil, X, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { resourceService } from '../../services/resourceService'
import { useResources, useStats } from '../../hooks/useResources'
import Spinner from '../ui/Spinner'

const EMPTY = { title:'', subject:'', branch:'CSE', semester:1, type:'notes', year:'', description:'', fileUrl:'' }
const BRANCHES = ['CSE','ECE','ME','CE','EEE','IT','OTHER']

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide block">{label}</label>
      {children}
    </div>
  )
}

const STAT_COLORS = ['text-ink-600 dark:text-ink-400','text-emerald-600 dark:text-emerald-400','text-amber-600 dark:text-amber-400','text-sky-600 dark:text-sky-400','text-rose-600 dark:text-rose-400']

export default function Admin() {
  const [form, setForm]     = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [tab, setTab]       = useState('list')
  const { resources, loading, refetch } = useResources({ limit: 200 })
  const { stats } = useStats()

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const startEdit = (r) => {
    setForm({ title:r.title, subject:r.subject, branch:r.branch, semester:r.semester,
              type:r.type, year:r.year||'', description:r.description||'', fileUrl:r.fileUrl })
    setEditId(r._id); setTab('add')
  }
  const cancelEdit = () => { setForm(EMPTY); setEditId(null) }

  const submit = async (e) => {
    e.preventDefault(); setSaving(true)
    try {
      editId ? await resourceService.update(editId, form) : await resourceService.create(form)
      toast.success(editId ? 'Resource updated!' : 'Resource added!')
      setForm(EMPTY); setEditId(null); setTab('list'); refetch()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed')
    } finally { setSaving(false) }
  }

  const remove = async (id) => {
    if (!confirm('Delete this resource?')) return
    try { await resourceService.delete(id); toast.success('Deleted'); refetch() }
    catch { toast.error('Delete failed') }
  }

  const statItems = stats
    ? [['Total', stats.total],['Notes', stats.notes],['Q-Papers', stats.qpaper],['Solved', stats.solved],['Views', stats.views]]
    : []

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold text-stone-900 dark:text-stone-50">Admin Panel</h1>
        <button onClick={refetch} className="btn-outline py-2 text-xs"><RefreshCw className="w-3.5 h-3.5" /> Refresh</button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-5 gap-2">
          {statItems.map(([label, value], i) => (
            <div key={label} className="bg-white dark:bg-canvas-800 border border-stone-200 dark:border-stone-800 rounded-2xl p-3 text-center shadow-sm">
              <p className={`font-display font-extrabold text-xl ${STAT_COLORS[i]}`}>{value}</p>
              <p className="text-[11px] font-medium text-stone-400 dark:text-stone-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl w-fit">
        {[['list','All resources'],['add', editId ? 'Edit' : 'Add resource']].map(([t, label]) => (
          <button key={t} onClick={() => { setTab(t); if (t==='list') cancelEdit() }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              tab===t ? 'bg-white dark:bg-stone-700 text-ink-600 dark:text-ink-400 shadow-sm'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-700'
            }`}>{label}</button>
        ))}
      </div>

      {/* Form */}
      {tab === 'add' && (
        <div className="bg-white dark:bg-canvas-800 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-card p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              {editId ? <><Pencil className="w-4 h-4 text-ink-500" /> Edit resource</>
                      : <><Plus className="w-4 h-4 text-ink-500" /> Add new resource</>}
            </h2>
            {editId && <button onClick={cancelEdit} className="text-xs text-stone-400 hover:text-stone-600 flex items-center gap-1"><X className="w-3.5 h-3.5" /> Cancel</button>}
          </div>
          <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Title *"><input className="field" required placeholder="e.g. Data Structures Notes" value={form.title} onChange={e=>set('title',e.target.value)} /></Field>
            <Field label="Subject / Code *"><input className="field" required placeholder="e.g. BCS301 / Data Structures" value={form.subject} onChange={e=>set('subject',e.target.value)} /></Field>
            <Field label="Branch"><select className="field" value={form.branch} onChange={e=>set('branch',e.target.value)}>{BRANCHES.map(b=><option key={b}>{b}</option>)}</select></Field>
            <Field label="Semester"><select className="field" value={form.semester} onChange={e=>set('semester',+e.target.value)}>{[1,2,3,4,5,6,7,8].map(s=><option key={s} value={s}>Semester {s}</option>)}</select></Field>
            <Field label="Type"><select className="field" value={form.type} onChange={e=>set('type',e.target.value)}><option value="notes">Notes</option><option value="qpaper">Q-Paper</option><option value="solved">Solved Paper</option></select></Field>
            <Field label="Year"><input className="field" placeholder="e.g. 2024" value={form.year} onChange={e=>set('year',e.target.value)} /></Field>
            <div className="sm:col-span-2">
              <Field label="File URL * (ImageKit / Archive.org / GitHub)"><input className="field" required type="url" placeholder="https://ik.imagekit.io/..." value={form.fileUrl} onChange={e=>set('fileUrl',e.target.value)} /></Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Description"><textarea className="field resize-none" rows={2} placeholder="Brief description (optional)" value={form.description} onChange={e=>set('description',e.target.value)} /></Field>
            </div>
            <div className="sm:col-span-2 flex gap-2">
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? <Spinner size="sm" /> : editId ? <><Check className="w-4 h-4"/>Save changes</> : <><Plus className="w-4 h-4"/>Add resource</>}
              </button>
              {editId && <button type="button" onClick={cancelEdit} className="btn-outline">Cancel</button>}
            </div>
          </form>
        </div>
      )}

      {/* List */}
      {tab === 'list' && (
        <div className="bg-white dark:bg-canvas-800 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-card overflow-hidden">
          <div className="px-5 py-3.5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
            <h2 className="font-display font-bold text-sm text-stone-900 dark:text-stone-100">All resources ({resources.length})</h2>
            <button onClick={() => setTab('add')} className="btn-primary py-1.5 text-xs"><Plus className="w-3.5 h-3.5"/>Add</button>
          </div>
          {loading ? (
            <div className="flex justify-center py-10"><Spinner /></div>
          ) : (
            <div className="divide-y divide-stone-100 dark:divide-stone-800">
              {resources.length === 0 && <p className="px-5 py-10 text-sm text-stone-400 text-center">No resources yet.</p>}
              {resources.map(r => (
                <div key={r._id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 truncate">{r.title}</p>
                    <p className="text-xs text-stone-400 font-mono mt-0.5">{r.subject} · Sem {r.semester} · {r.branch} · {r.type}{r.year ? ` · ${r.year}` : ''} · {r.views} views</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => startEdit(r)} className="p-2 rounded-xl text-stone-400 hover:text-ink-500 hover:bg-ink-50 dark:hover:bg-ink-900/20 transition-all"><Pencil className="w-3.5 h-3.5"/></button>
                    <button onClick={() => remove(r._id)} className="p-2 rounded-xl text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"><Trash2 className="w-3.5 h-3.5"/></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
