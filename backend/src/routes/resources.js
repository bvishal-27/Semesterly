import { Router } from 'express'
import {
  getResources, getSubjects, getStats, getResource,
  createResource, updateResource, deleteResource
} from '../controllers/resourceController.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = Router()

// Public
router.get('/',              getResources)
router.get('/meta/subjects', getSubjects)
router.get('/meta/stats',    getStats)
router.get('/:id',           getResource)

// Admin only
router.post('/',             protect, adminOnly, createResource)
router.put('/:id',           protect, adminOnly, updateResource)
router.delete('/:id',        protect, adminOnly, deleteResource)

export default router
