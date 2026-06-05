import { Router } from 'express'
import { getSummary } from '../controllers/analyticsController.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = Router()
router.get('/summary', protect, adminOnly, getSummary)
export default router
