import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { BookOpen, Eye, EyeOff, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import { authService } from '../../services/resourceService'
import { useAuth } from '../../context/AuthContext'
import Spinner from '../ui/Spinner'

export default function Login() {
  const [form, setForm]       = useState({ email: '', password: '' })
  const [show, setShow]       = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate  = useNavigate()

  const submit = async (e) => {
    e.preventDefault(); setLoading(true)
    try {
      const { data } = await authService.login(form)
      login(data.token); toast.success('Welcome back!')
      navigate('/admin')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6 animate-fade-up">

        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-2xl bg-primary-500 flex items-center justify-center shadow-glow">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Admin sign in</h1>
            <p className="text-sm text-gray-400 mt-1">
              Students don't need an account —{' '}
              <Link to="/" className="text-primary-500 font-semibold hover:underline">browse freely</Link>
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-card p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Email</label>
            <input className="field" type="email" required placeholder="admin@college.edu"
              value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Password</label>
            <div className="relative">
              <input className="field pr-11" type={show ? 'text' : 'password'} required placeholder="••••••••"
                value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />
              <button type="button" onClick={() => setShow(p => !p)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-[15px]">
            {loading ? <Spinner size="sm" /> : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
