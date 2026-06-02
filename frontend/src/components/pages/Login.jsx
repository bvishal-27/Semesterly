import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { BookMarked, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import { authService } from '../../services/resourceService'
import { useAuth } from '../../context/AuthContext'
import Spinner from '../ui/Spinner'

export default function Login() {
  const [form, setForm]   = useState({ email: '', password: '' })
  const [show, setShow]   = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate  = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await authService.login(form)
      login(data.token)
      toast.success('Welcome back!')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-sm space-y-6 animate-fade-up">
        {/* Brand */}
        <div className="text-center space-y-1">
          <div className="flex justify-center">
            <div className="p-3 rounded-2xl bg-brand-50 dark:bg-brand-900/30">
              <BookMarked className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            </div>
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-gray-50">Sign in</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Admin access to manage resources</p>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="card p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input className="input" type="email" required placeholder="admin@college.edu"
              value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Password</label>
            <div className="relative">
              <input className="input pr-10" type={show ? 'text' : 'password'} required placeholder="••••••••"
                value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />
              <button type="button" onClick={() => setShow(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn-primary w-full justify-center" disabled={loading}>
            {loading ? <Spinner size="sm" /> : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400">
          Students don't need an account —{' '}
          <Link to="/" className="text-brand-600 dark:text-brand-400 hover:underline">browse freely</Link>
        </p>
      </div>
    </div>
  )
}
