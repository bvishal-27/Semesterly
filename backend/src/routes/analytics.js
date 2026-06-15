import { Router } from 'express'
import { pingVisit, getVisitorCount, getSummary } from '../controllers/analyticsController.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = Router()

router.post('/ping',     pingVisit)        // public — once per session
router.get('/visitors',  getVisitorCount)  // public — visitor counter badge
router.get('/summary',   protect, adminOnly, getSummary) // admin only

export default router
