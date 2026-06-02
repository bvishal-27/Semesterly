import { useState } from 'react'
import { Plus, Trash2, RefreshCw, Pencil, X, Check, BarChart2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { resourceService } from '../../services/resourceService'
import { useResources, useStats } from '../../hooks/useResources'
import Spinner from '../ui/Spinner'

const EMPTY = { title: '', subject: '', branch: 'CSE', semester: 1, type: 'notes', year: '', description: '', fileUrl: '' }
const BRANCHES = ['CSE','ECE','ME','CE','EEE','IT','OTHER']

function Field({ label, children }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block">{label}</label>
      {children}
    </div>
  )
}

export default function Admin() {
  const [form, setForm]       = useState(EMPTY)
  const [editId, setEditId]   = useState(null)
  const [saving, setSaving]   = useState(false)
  const [tab, setTab]         = useState('list') // 'list' | 'add'

  const { resources, loading, refetch } = useResources({ limit: 100 })
  const { stats } = useStats()

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const startEdit = (r) => {
    setForm({ title: r.title, subject: r.subject, branch: r.branch,
              semester: r.semester, type: r.type, year: r.year || '',
              description: r.description || '', fileUrl: r.fileUrl })
    setEditId(r._id)
    setTab('add')
  }

  const cancelEdit = () => { setForm(EMPTY); setEditId(null) }

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editId) {
        await resourceService.update(editId, form)
        toast.success('Resource updated!')
        setEditId(null)
      } else {
        await resourceService.create(form)
        toast.success('Resource added!')
      }
      setForm(EMPTY)
      setTab('list')
      refetch()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    if (!confirm('Delete this resource?')) return
    try {
      await resourceService.delete(id)
      toast.success('Deleted')
      refetch()
    } catch { toast.error('Delete failed') }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-gray-50">Admin Panel</h1>
        <button onClick={refetch} className="btn-secondary py-1.5 text-xs">
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {/* Stats mini-bar */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: 'Total',    value: stats.total,    color: 'text-brand-600 dark:text-brand-400' },
            { label: 'Notes',    value: stats.notes,    color: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Q-Papers', value: stats.qpaper,   color: 'text-amber-600 dark:text-amber-400' },
            { label: 'Solved',   value: stats.solved,   color: 'text-blue-600 dark:text-blue-400' },
            { label: 'Views',    value: stats.views,    color: 'text-purple-600 dark:text-purple-400' },
          ].map(s => (
            <div key={s.label} className="card p-3 text-center">
              <p className={`font-display font-bold text-xl ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
        {[['list','All resources'], ['add', editId ? 'Edit resource' : 'Add resource']].map(([t, label]) => (
          <button key={t} onClick={() => { setTab(t); if (t === 'list') cancelEdit() }}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
              tab === t ? 'bg-white dark:bg-gray-700 text-brand-600 dark:text-brand-400 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
            }`}>{label}</button>
        ))}
      </div>

      {/* ADD / EDIT FORM */}
      {tab === 'add' && (
        <div className="card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              {editId ? <><Pencil className="w-4 h-4 text-brand-500" /> Edit resource</> 
                      : <><Plus className="w-4 h-4 text-brand-500" /> Add new resource</>}
            </h2>
            {editId && (
              <button onClick={cancelEdit} className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1">
                <X className="w-3.5 h-3.5" /> Cancel edit
              </button>
            )}
          </div>

          <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Title *">
              <input className="input" required placeholder="e.g. Data Structures Unit 3 Notes"
                value={form.title} onChange={e => set('title', e.target.value)} />
            </Field>
            <Field label="Subject *">
              <input className="input" required placeholder="e.g. Data Structures"
                value={form.subject} onChange={e => set('subject', e.target.value)} />
            </Field>
            <Field label="Branch">
              <select className="input" value={form.branch} onChange={e => set('branch', e.target.value)}>
                {BRANCHES.map(b => <option key={b}>{b}</option>)}
              </select>
            </Field>
            <Field label="Semester">
              <select className="input" value={form.semester} onChange={e => set('semester', +e.target.value)}>
                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
              </select>
            </Field>
            <Field label="Type">
              <select className="input" value={form.type} onChange={e => set('type', e.target.value)}>
                <option value="notes">Notes</option>
                <option value="qpaper">Q-Paper</option>
                <option value="solved">Solved Paper</option>
              </select>
            </Field>
            <Field label="Year (for Q-Papers)">
              <input className="input" placeholder="e.g. 2023" value={form.year}
                onChange={e => set('year', e.target.value)} />
            </Field>
            <Field label="File URL * (Internet Archive / GitHub raw)">
              <input className="input sm:col-span-2" required type="url" placeholder="https://archive.org/..."
                value={form.fileUrl} onChange={e => set('fileUrl', e.target.value)} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Description (optional)">
                <textarea className="input resize-none" rows={2} placeholder="Brief description"
                  value={form.description} onChange={e => set('description', e.target.value)} />
              </Field>
            </div>
            <div className="sm:col-span-2 flex gap-2">
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? <Spinner size="sm" /> : editId
                  ? <><Check className="w-4 h-4" /> Save changes</>
                  : <><Plus className="w-4 h-4" /> Add resource</>}
              </button>
              {editId && (
                <button type="button" onClick={cancelEdit} className="btn-secondary">Cancel</button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* LIST */}
      {tab === 'list' && (
        <div className="card overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h2 className="font-display font-semibold text-sm text-gray-800 dark:text-gray-200">
              All resources ({resources.length})
            </h2>
            <button onClick={() => setTab('add')} className="btn-primary py-1.5 text-xs">
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>
          {loading ? (
            <div className="flex justify-center py-10"><Spinner /></div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {resources.length === 0 && (
                <p className="px-5 py-8 text-sm text-gray-400 text-center">No resources yet. Add your first one!</p>
              )}
              {resources.map(r => (
                <div key={r._id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{r.title}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {r.subject} · Sem {r.semester} · {r.branch} · 
                      <span className="ml-1 capitalize">{r.type === 'qpaper' ? 'Q-Paper' : r.type}</span>
                      {r.year && ` · ${r.year}`}
                      <span className="ml-2 text-gray-300 dark:text-gray-600">{r.views} views</span>
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => startEdit(r)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => remove(r._id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
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
