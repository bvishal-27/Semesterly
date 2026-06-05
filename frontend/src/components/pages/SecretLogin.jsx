import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import api from '../../services/api'
import Login from './Login'
import Spinner from '../ui/Spinner'

export default function SecretLogin() {
  const { token } = useParams()
  const [status, setStatus] = useState('checking') // checking | valid | invalid

  useEffect(() => {
    api.get(`/admin/verify-route?token=${token}`)
      .then(() => setStatus('valid'))
      .catch(() => setStatus('invalid'))
  }, [token])

  if (status === 'checking') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  // Wrong token → 404 page, no hint it exists
  if (status === 'invalid') return <Navigate to="/" replace />

  // Correct token → show login
  return <Login />
}
