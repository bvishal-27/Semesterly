import Analytics from '../models/Analytics.js'
import Resource  from '../models/Resource.js'

function today() {
  return new Date().toISOString().split('T')[0]
}

// Called on every page request — track IP + page view
export async function trackVisit(req, res, next) {
  try {
    const ip   = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.ip || 'unknown'
    const date = today()
    await Analytics.findOneAndUpdate(
      { date },
      { $inc: { pageViews: 1 }, $addToSet: { uniqueIPs: ip } },
      { upsert: true, new: true }
    )
  } catch {} // never block request
  next()
}

// GET /api/analytics/summary  (admin only)
export async function getSummary(req, res, next) {
  try {
    const last30 = await Analytics.find().sort({ date: -1 }).limit(30)

    const totalViews   = last30.reduce((s, d) => s + d.pageViews, 0)
    const totalUnique  = new Set(last30.flatMap(d => d.uniqueIPs)).size
    const todayDoc     = last30.find(d => d.date === today())
    const totalResOpens = await Resource.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }])

    res.json({
      totalViews,
      uniqueVisitors: totalUnique,
      todayViews:     todayDoc?.pageViews || 0,
      todayUnique:    todayDoc?.uniqueIPs.length || 0,
      resourceOpens:  totalResOpens[0]?.total || 0,
      daily: last30.map(d => ({
        date: d.date,
        views: d.pageViews,
        unique: d.uniqueIPs.length
      })).reverse(),
    })
  } catch (e) { next(e) }
}
