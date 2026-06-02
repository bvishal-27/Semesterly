import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { BookMarked, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import { authService } from '../../services/resourceService'
import { useAuth } from '../../context/AuthContext'
import Spinner from '../ui/Spinner'

export default function Login() {
  const [form, setForm]       = useState({ email: '', password: '' })
  const [show, setShow]       = useState(false)
  const [loading, setLoading] = useState(false)
  const { login }  = useAuth()
  const navigate   = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await authService.login(form)
      login(data.token)
      toast.success('Welcome back!')
      navigate('/admin')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6 animate-fade-up">

        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-2xl bg-ink-500 flex items-center justify-center shadow-md">
              <BookMarked className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="font-display text-2xl font-extrabold text-stone-900 dark:text-stone-50">Admin sign in</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">Students don't need to sign in — <Link to="/" className="text-ink-600 dark:text-ink-400 font-semibold hover:underline">browse freely</Link></p>
        </div>

        <form onSubmit={submit}
          className="bg-white dark:bg-canvas-800 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-card p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wide">Email</label>
            <input className="field" type="email" required placeholder="admin@college.edu"
              value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wide">Password</label>
            <div className="relative">
              <input className="field pr-10" type={show ? 'text' : 'password'} required placeholder="••••••••"
                value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />
              <button type="button" onClick={() => setShow(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="btn-primary w-full py-3 rounded-xl mt-2">
            {loading ? <Spinner size="sm" /> : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
