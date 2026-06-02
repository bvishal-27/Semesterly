import { useState, useEffect, useCallback } from 'react'
import { resourceService } from '../services/resourceService'

export function useResources(filters = {}) {
  const [resources, setResources] = useState([])
  const [total, setTotal]         = useState(0)
  const [pages, setPages]         = useState(1)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)

  const fetchResources = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data } = await resourceService.getAll(filters)
      setResources(data.resources || [])
      setTotal(data.total || 0)
      setPages(data.pages || 1)
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load resources')
    } finally {
      setLoading(false)
    }
  }, [JSON.stringify(filters)])

  useEffect(() => { fetchResources() }, [fetchResources])

  return { resources, total, pages, loading, error, refetch: fetchResources }
}

export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

export function useStats() {
  const [stats, setStats]     = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    resourceService.getStats()
      .then(({ data }) => setStats(data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false))
  }, [])
  return { stats, loading }
}
