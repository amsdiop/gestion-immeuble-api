import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { AppDataSource, initializeDataSource } from './database/data-source';
import { initializeDatabase } from './database/init';
import authRoutes from './routes/auth.routes';
import usersRoutes from './routes/users.routes';
import immeubleRoutes from './routes/immeuble.routes';
import bienRoutes from './routes/bien.routes';
import locataireRoutes from './routes/locataires.routes';
import dashboardRoutes from './routes/dashboard.routes';

dotenv.config();

const app: Express = express();
const PORT = process.env.SERVER_PORT || 3000;

// Middleware de sÃ©curitÃ©
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true,
}));

// Middleware de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Middleware de logging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} [${req.method}] ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API version
app.get('/api/v1', (req: Request, res: Response) => {
  res.json({
    name: 'Gestion_Immeuble API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      auth: '/api/v1/auth',
      immeubles: '/api/v1/immeubles',
      biens: '/api/v1/biens',
      locataires: '/api/v1/locataires',
      dashboard: '/api/v1/dashboard',
    },
  });
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/immeubles', immeubleRoutes);
app.use('/api/v1/biens', bienRoutes);
app.use('/api/v1/locataires', locataireRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('âŒ Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
    code: err.code || 'INTERNAL_ERROR',
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path,
  });
});

// Start server
async function start() {
  try {
    // Create database if not exists
    await initializeDatabase();

    // Initialize database connection and sync schema
    await initializeDataSource();

    // Start listening
    app.listen(PORT, () => {
      console.log(`
â•”â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•—
â•‘   ðŸ¢ Gestion_Immeuble API v1.0.0      â•‘
â•‘   ðŸš€ Server running on:                â•‘
â•‘   â†’ http://localhost:${PORT}              â•‘
â•‘   ðŸ—„ï¸  Database: immeuble               â•‘
â•‘   âœ… Ready to handle requests!         â•‘
â•šâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
      `);
    });
  } catch (error) {
    console.error('âŒ Failed to start server:', error);
    process.exit(1);
  }
}

start();

export default app;

