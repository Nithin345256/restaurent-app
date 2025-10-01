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

// ✅ FIXED: CORS Middleware - Allow all origins for development
app.use(cors({
  origin: '*', // Allow all origins (for development)
  // OR for production, allow specific origins:
  // origin: ['http://localhost:3000', 'http://10.177.21.127:3000', 'exp://192.168.1.100:8081'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  ALLOWED_ORIGINS:['http://localhost:3000','http://10.177.21.127:19000','http://10.177.21.127:8000']
}));

// ✅ Body parsers - MUST come before routes
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ✅ Serve static files (for uploaded images)
app.use('/uploads', express.static('uploads'));

// DB connection and server start
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    // ✅ Test route — ensure it's reachable
    app.get('/api/health', (req, res) => {
      console.log("🔥 /api/health was hit");
      res.status(200).json({ 
        message: "Server is running", 
        status: "OK",
        timestamp: new Date().toISOString()
      });
    });

    // ✅ API routes
    app.use('/api', router);
    app.use('/api/orders', orderRoutes);

    // ❌ 404 handler — must be last
    app.use((req, res) => {
      console.log("❌ 404 - No route matched:", req.method, req.originalUrl);
      res.status(404).json({ 
        message: 'Route not found',
        path: req.originalUrl,
        method: req.method
      });
    });

    // ✅ Error handler
    app.use(errorHandler);

    // ✅ Listen on all interfaces (important for mobile access)
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