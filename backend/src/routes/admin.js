import { Router } from 'express'

const router = Router()

// GET /api/admin/verify-route?token=xxx
// Frontend calls this to check if secret route is valid
router.get('/verify-route', (req, res) => {
  const { token } = req.query
  const secret = process.env.ADMIN_ROUTE
  if (!secret || token !== secret) {
    return res.status(404).json({ message: 'Not found' })
  }
  res.json({ valid: true })
})

export default router
