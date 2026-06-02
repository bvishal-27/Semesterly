import 'dotenv/config'
import express  from 'express'
import cors     from 'cors'
import helmet   from 'helmet'
import morgan   from 'morgan'
import rateLimit from 'express-rate-limit'
import { connectDB }     from './config/db.js'
import authRoutes        from './routes/auth.js'
import resourceRoutes    from './routes/resources.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

const app = express()

// ── Security ──────────────────────────────────────────
app.use(helmet())
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))

// ── Rate limiting ────────────────────────────────────
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 200, message: { message: 'Too many requests' } }))
app.use('/api/auth/', rateLimit({ windowMs: 15 * 60 * 1000, max: 20, message: { message: 'Too many auth attempts' } }))

// ── Parsing ───────────────────────────────────────────
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

// ── Health check ──────────────────────────────────────
app.get('/api/health', (_, res) => res.json({ status: 'ok', env: process.env.NODE_ENV }))

// ── Routes ─────────────────────────────────────────────
app.use('/api/auth',      authRoutes)
app.use('/api/resources', resourceRoutes)

// ── 404 + Error handler ────────────────────────────────
app.use(notFound)
app.use(errorHandler)

// ── Start ──────────────────────────────────────────────
const PORT = process.env.PORT || 5000
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
    console.log(`   Environment: ${process.env.NODE_ENV}`)
  })
})
