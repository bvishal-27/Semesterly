import { useState } from 'react'
import { Plus, Trash2, RefreshCw, Pencil, X, Check, LayoutGrid, PlusCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { resourceService } from '../../services/resourceService'
import { useResources, useStats } from '../../hooks/useResources'
import Spinner from '../ui/Spinner'

const EMPTY = { title:'', subject:'', branch:'CSE', semester:1, type:'notes', year:'', description:'', fileUrl:'' }
const BRANCHES = ['CSE','ECE','ME','CE','EEE','IT','OTHER']

export default function Admin() {
  const [form, setForm]     = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [tab, setTab]       = useState('list')
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

  const F = ({ label, children }) => (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">{label}</label>
      {children}
    </div>
  )

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Admin Panel</h1>
        <button onClick={refetch} className="btn-secondary py-2 text-xs"><RefreshCw className="w-3.5 h-3.5" /> Refresh</button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-5 gap-2">
          {[['Total',stats.total,'text-primary-500'],['Notes',stats.notes,'text-emerald-500'],
            ['Q-Papers',stats.qpaper,'text-amber-500'],['Solved',stats.solved,'text-sky-500'],
            ['Views',stats.views,'text-rose-500']].map(([label,value,color]) => (
            <div key={label} className="bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-gray-800 rounded-2xl p-3 text-center shadow-card">
              <p className={`font-black text-2xl tracking-tight ${color}`}>{value}</p>
              <p className="text-[11px] font-semibold text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800/60 p-1 rounded-xl w-fit">
        {[['list',<LayoutGrid className="w-3.5 h-3.5"/>,'Resources'],
          ['add',<PlusCircle className="w-3.5 h-3.5"/>,(editId ? 'Edit' : 'Add')]].map(([t,icon,label]) => (
          <button key={t} onClick={() => { setTab(t); if(t==='list') cancel() }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              tab===t ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-800'
            }`}>{icon}{label}</button>
        ))}
      </div>

      {/* Add/Edit form */}
      {tab === 'add' && (
        <div className="bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-card p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-900 dark:text-white">
              {editId ? 'Edit resource' : 'Add new resource'}
            </h2>
            {editId && <button onClick={cancel} className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"><X className="w-3 h-3"/>Cancel</button>}
          </div>
          <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <F label="Title *"><input className="field" required placeholder="e.g. Data Structures Notes" value={form.title} onChange={e=>s('title',e.target.value)}/></F>
            <F label="Subject / Code *"><input className="field" required placeholder="e.g. BCS301 / DBMS" value={form.subject} onChange={e=>s('subject',e.target.value)}/></F>
            <F label="Branch"><select className="field" value={form.branch} onChange={e=>s('branch',e.target.value)}>{BRANCHES.map(b=><option key={b}>{b}</option>)}</select></F>
            <F label="Semester"><select className="field" value={form.semester} onChange={e=>s('semester',+e.target.value)}>{[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>Semester {n}</option>)}</select></F>
            <F label="Type"><select className="field" value={form.type} onChange={e=>s('type',e.target.value)}><option value="notes">Notes</option><option value="qpaper">Q-Paper</option><option value="solved">Solved Paper</option></select></F>
            <F label="Year (optional)"><input className="field" placeholder="e.g. 2024" value={form.year} onChange={e=>s('year',e.target.value)}/></F>
            <div className="sm:col-span-2"><F label="File URL *"><input className="field" required type="url" placeholder="https://ik.imagekit.io/... or archive.org/..." value={form.fileUrl} onChange={e=>s('fileUrl',e.target.value)}/></F></div>
            <div className="sm:col-span-2"><F label="Description"><textarea className="field resize-none" rows={2} placeholder="Brief description (optional)" value={form.description} onChange={e=>s('description',e.target.value)}/></F></div>
            <div className="sm:col-span-2 flex gap-2">
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? <Spinner size="sm"/> : editId ? <><Check className="w-4 h-4"/>Save</> : <><Plus className="w-4 h-4"/>Add</>}
              </button>
              {editId && <button type="button" onClick={cancel} className="btn-secondary">Cancel</button>}
            </div>
          </form>
        </div>
      )}

      {/* List */}
      {tab === 'list' && (
        <div className="bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h2 className="font-bold text-sm text-gray-900 dark:text-white">All resources ({resources.length})</h2>
            <button onClick={()=>setTab('add')} className="btn-primary py-1.5 text-xs"><Plus className="w-3.5 h-3.5"/>Add</button>
          </div>
          {loading ? (
            <div className="flex justify-center py-12"><Spinner /></div>
          ) : (
            <div className="divide-y divide-gray-50 dark:divide-gray-800/60">
              {resources.length === 0 && <p className="px-5 py-10 text-sm text-gray-400 text-center">No resources yet.</p>}
              {resources.map(r => (
                <div key={r._id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/60 dark:hover:bg-gray-800/30 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{r.title}</p>
                    <p className="text-[11px] font-mono text-gray-400 mt-0.5">{r.subject} · Sem {r.semester} · {r.branch} · {r.type}{r.year?` · ${r.year}`:''}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={()=>startEdit(r)} className="p-2 rounded-xl text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all"><Pencil className="w-3.5 h-3.5"/></button>
                    <button onClick={()=>remove(r._id)} className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"><Trash2 className="w-3.5 h-3.5"/></button>
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
