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

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// DB connection and server start
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    // ✅ Test route — ensure it's reachable
    app.get('/api/health', (req, res) => {
      console.log("🔥 /api/health was hit");
      res.status(200).json({ message: "Server is running", status: "OK" });
    });

    // ✅ API routes
    app.use('/api', router);
    app.use('/api/orders', orderRoutes);

    // ❌ 404 handler — must be last
    app.use((req, res) => {
      console.log("❌ 404 - No route matched:", req.method, req.originalUrl);
      res.status(404).json({ message: 'Route not found' });
    });

    // ✅ Error handler
    app.use(errorHandler);

    // ✅ Listen on all interfaces (important)
    app.listen(port, '0.0.0.0', () => {
      console.log(`✅ Server running on http://0.0.0.0:${port}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
