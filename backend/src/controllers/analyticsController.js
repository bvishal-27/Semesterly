import Analytics from '../models/Analytics.js'

function today() {
  return new Date().toISOString().split('T')[0]
}

function daysAgo(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split('T')[0]
}

// ── POST /api/analytics/ping ──────────────────────────
// Called once per browser per day (frontend uses localStorage to gate this)
export async function pingVisit(req, res) {
  try {
    const ip   = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.ip || 'unknown'
    const date = today()
    await Analytics.findOneAndUpdate(
      { date },
      { $inc: { pageViews: 1 }, $addToSet: { uniqueIPs: ip } },
      { upsert: true, new: true }
    )
    res.json({ ok: true })
  } catch {
    res.json({ ok: false })
  }
}

// ── GET /api/analytics/visitors ───────────────────────
// Public — total unique visitors across all recorded history
export async function getVisitorCount(req, res) {
  try {
    const all   = await Analytics.find({}, { uniqueIPs: 1 })
    const total = new Set(all.flatMap(d => d.uniqueIPs)).size
    res.json({ visitors: total })
  } catch {
    res.json({ visitors: 0 })
  }
}

// ── GET /api/analytics/summary ────────────────────────
// Admin only. Supports:
//   ?range=7d | 30d | 90d | 1y | all   (preset)
//   ?from=YYYY-MM-DD&to=YYYY-MM-DD     (custom range — overrides preset)
export async function getSummary(req, res, next) {
  try {
    const { range = '30d', from, to } = req.query

    let startDate, endDate = today()

    if (from && to) {
      startDate = from
      endDate   = to
    } else {
      const presetDays = { '7d': 7, '30d': 30, '90d': 90, '1y': 365 }
      if (range === 'all') {
        startDate = '2000-01-01'
      } else {
        startDate = daysAgo((presetDays[range] || 30) - 1)
      }
    }

    const docs = await Analytics.find({
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 })

    const totalViews     = docs.reduce((s, d) => s + d.pageViews, 0)
    const totalUnique    = new Set(docs.flatMap(d => d.uniqueIPs)).size
    const totalOpens     = docs.reduce((s, d) => s + (d.resourceOpens || 0), 0)
    const todayDoc       = docs.find(d => d.date === today())

    // ── Monthly aggregation (YYYY-MM) ──
    const monthlyMap = {}
    for (const d of docs) {
      const month = d.date.slice(0, 7) // YYYY-MM
      if (!monthlyMap[month]) {
        monthlyMap[month] = { month, views: 0, opens: 0, ips: new Set() }
      }
      monthlyMap[month].views += d.pageViews
      monthlyMap[month].opens += (d.resourceOpens || 0)
      d.uniqueIPs.forEach(ip => monthlyMap[month].ips.add(ip))
    }
    const monthly = Object.values(monthlyMap).map(m => ({
      month: m.month,
      views: m.views,
      unique: m.ips.size,
      opens: m.opens,
    })).sort((a, b) => a.month.localeCompare(b.month))

    res.json({
      range: { from: startDate, to: endDate },
      totalViews,
      uniqueVisitors: totalUnique,
      todayViews:     todayDoc?.pageViews        || 0,
      todayUnique:    todayDoc?.uniqueIPs.length || 0,
      resourceOpens:  totalOpens,
      daily: docs.map(d => ({
        date:   d.date,
        views:  d.pageViews,
        unique: d.uniqueIPs.length,
        opens:  d.resourceOpens || 0,
      })).reverse(), // most recent first
      monthly,
    })
  } catch (e) { next(e) }
}
