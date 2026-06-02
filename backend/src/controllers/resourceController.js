import Resource from '../models/Resource.js'

// GET /api/resources
export async function getResources(req, res, next) {
  try {
    const { search, type, semester, branch, page = 1, limit = 20 } = req.query
    const query = {}

    if (search)   query.$text = { $search: search }
    if (type)     query.type  = type
    if (semester) query.semester = +semester
    if (branch)   query.branch   = branch

    const skip  = (+page - 1) * +limit
    const [resources, total] = await Promise.all([
      Resource.find(query).sort({ createdAt: -1 }).skip(skip).limit(+limit),
      Resource.countDocuments(query),
    ])
    res.json({ resources, total, page: +page, pages: Math.ceil(total / +limit) })
  } catch (e) { next(e) }
}

// GET /api/resources/meta/subjects
export async function getSubjects(req, res, next) {
  try {
    const subjects = await Resource.distinct('subject')
    res.json({ subjects: subjects.sort() })
  } catch (e) { next(e) }
}

// GET /api/resources/:id
export async function getResource(req, res, next) {
  try {
    const r = await Resource.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    )
    if (!r) return res.status(404).json({ message: 'Resource not found' })
    res.json({ resource: r })
  } catch (e) { next(e) }
}

// POST /api/resources  (admin only)
export async function createResource(req, res, next) {
  try {
    const r = await Resource.create({ ...req.body, uploadedBy: req.user._id })
    res.status(201).json({ resource: r })
  } catch (e) { next(e) }
}

// PUT /api/resources/:id  (admin only)
export async function updateResource(req, res, next) {
  try {
    const r = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!r) return res.status(404).json({ message: 'Resource not found' })
    res.json({ resource: r })
  } catch (e) { next(e) }
}

// DELETE /api/resources/:id  (admin only)
export async function deleteResource(req, res, next) {
  try {
    const r = await Resource.findByIdAndDelete(req.params.id)
    if (!r) return res.status(404).json({ message: 'Resource not found' })
    res.json({ message: 'Deleted successfully' })
  } catch (e) { next(e) }
}

// GET /api/resources/meta/stats
export async function getStats(req, res, next) {
  try {
    const [total, byType, subjects, totalViews] = await Promise.all([
      Resource.countDocuments(),
      Resource.aggregate([{ $group: { _id: '$type', count: { $sum: 1 } } }]),
      Resource.distinct('subject'),
      Resource.aggregate([{ $group: { _id: null, views: { $sum: '$views' } } }]),
    ])
    const types = { notes: 0, qpaper: 0, solved: 0 }
    byType.forEach(t => { types[t._id] = t.count })
    res.json({
      total,
      subjects: subjects.length,
      views: totalViews[0]?.views || 0,
      ...types,
    })
  } catch (e) { next(e) }
}
