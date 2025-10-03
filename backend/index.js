import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import router from './routes/router.js';
import orderRoutes from './routes/orderRoutes.js';
import { errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// CORS - must be FIRST
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// Body parsers - MUST be BEFORE routes
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve static files
app.use('/uploads', express.static('uploads'));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    message: "Server is running",
    status: "OK",
    timestamp: new Date().toISOString()
  });
});

// API routes - BEFORE 404 handler
app.use('/api', router);
app.use('/api/orders', orderRoutes);

// 404 handler - AFTER all routes
app.use((req, res) => {
  console.log("❌ 404 - No route matched:", req.method, req.originalUrl);
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Error handler - LAST
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    app.listen(port, '0.0.0.0', () => {
      console.log(`✅ Server running on http://0.0.0.0:${port}`);
      console.log(`📱 Mobile access: http://10.177.21.127:${port}`);
      console.log(`🌐 Health check: http://10.177.21.127:${port}/api/health`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();