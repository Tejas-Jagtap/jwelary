import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Import routes
import authRoutes from '@/routes/auth';
import productRoutes from '@/routes/products';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
// Allow multiple dev origins (3000/3001, localhost/127.0.0.1) and optional comma-separated env
const envOrigins = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || 'http://localhost:3000')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const defaultDevOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001'
];

const allowedOrigins = Array.from(new Set([...envOrigins, ...defaultDevOrigins]));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (like curl / health checks)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      // Also allow VS Code simple browser or container-assigned IPs if they match localhost hostname
      try {
        const url = new URL(origin);
        if (
          (url.hostname === 'localhost' || url.hostname === '127.0.0.1') &&
          (url.port === '3000' || url.port === '3001')
        ) {
          return callback(null, true);
        }
      } catch (_) {}
      console.warn(`CORS blocked origin: ${origin}`);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Jwelary Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Jwelary Backend Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 Allowed CORS origins: ${allowedOrigins.join(', ')}`);
});
