import 'dotenv/config'
import express       from 'express'
import cors          from 'cors'
import helmet        from 'helmet'
import morgan        from 'morgan'
import rateLimit     from 'express-rate-limit'
import { connectDB }           from './config/db.js'
import authRoutes              from './routes/auth.js'
import resourceRoutes          from './routes/resources.js'
import analyticsRoutes         from './routes/analytics.js'
import { trackVisit }          from './controllers/analyticsController.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

const app = express()

app.use(helmet())
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true)
    
    const allowed = [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://semesterly-nine.vercel.app',
    ]
    
    if (allowed.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))

app.use('/api/', rateLimit({ windowMs: 15*60*1000, max: 300, message: { message: 'Too many requests' } }))
app.use('/api/auth/', rateLimit({ windowMs: 15*60*1000, max: 20, message: { message: 'Too many auth attempts' } }))

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

// Track every API hit
app.use('/api/', trackVisit)

app.get('/api/health', (_, res) => res.json({ status: 'ok', env: process.env.NODE_ENV }))

app.use('/api/auth',      authRoutes)
app.use('/api/resources', resourceRoutes)
app.use('/api/analytics', analyticsRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
    console.log(`   Environment: ${process.env.NODE_ENV}`)
  })
})
