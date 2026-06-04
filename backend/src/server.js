import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import resourceRoutes from './routes/resources.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();

// ── Security Middleware ──────────────────────────────────────────
app.use(helmet());

// Updated CORS - Fixed for Vercel + Local
app.use(cors({
  origin: [
    'https://semesterly-nine.vercel.app',     // Production Frontend
    'http://localhost:3000',                  // Local Frontend
    'https://semesterly-nine-git-*.vercel.app' // Preview deployments
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Handle preflight OPTIONS requests
app.options('*', cors());

// ── Rate Limiting ───────────────────────────────────────────────
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { message: 'Too many requests, please try again later.' }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: 'Too many auth attempts, please try again later.' }
});

app.use('/api/', generalLimiter);
app.use('/api/auth/', authLimiter);

// ── Body Parsing ─────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ── Logging ──────────────────────────────────────────────────────
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ── Health Check ─────────────────────────────────────────────────
app.get('/api/health', (_, res) => {
  res.json({ 
    status: 'ok', 
    env: process.env.NODE_ENV,
    message: 'Semesterly Backend is running'
  });
});

// ── Routes ───────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);

// ── Error Handling ───────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Start Server ─────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`   Environment: ${process.env.NODE_ENV}`);
    console.log(`   Frontend Allowed: https://semesterly-nine.vercel.app`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});