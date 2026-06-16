import 'dotenv/config'
import express       from 'express'
import cors          from 'cors'
import helmet        from 'helmet'
import morgan        from 'morgan'
import rateLimit     from 'express-rate-limit'
import { connectDB }              from './config/db.js'
import authRoutes                 from './routes/auth.js'
import resourceRoutes             from './routes/resources.js'
import analyticsRoutes            from './routes/analytics.js'
import adminRoutes                from './routes/admin.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

const app = express()

// ── Security headers ──────────────────────────────────
app.use(helmet())

// ── CORS ──────────────────────────────────────────────
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true) // Postman, curl etc
    const allowed = [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://semesterly.in',
      'https://www.semesterly.in',
      process.env.FRONTEND_URL,
    ].filter(Boolean)
    if (allowed.includes(origin)) return callback(null, true)
    callback(new Error(`CORS blocked: ${origin}`))
  },
  credentials: true
}))

// ── Rate limiting ─────────────────────────────────────
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000, max: 300,
  message: { message: 'Too many requests, slow down.' }
}))
// Stricter on auth — prevent brute force
app.use('/api/auth/', rateLimit({
  windowMs: 15 * 60 * 1000, max: 10,
  message: { message: 'Too many login attempts. Try again in 15 minutes.' }
}))

// ── Parsing ───────────────────────────────────────────
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))



// ── Health check ──────────────────────────────────────
app.get('/api/health', (_, res) =>
  res.json({ status: 'ok', env: process.env.NODE_ENV }))

// ── Routes ────────────────────────────────────────────
app.use('/api/auth',      authRoutes)
app.use('/api/resources', resourceRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/admin',     adminRoutes)

// ── 404 + Error ───────────────────────────────────────
app.use(notFound)
app.use(errorHandler)

// ── Start ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
    console.log(`   Environment: ${process.env.NODE_ENV}`)
  })
})
