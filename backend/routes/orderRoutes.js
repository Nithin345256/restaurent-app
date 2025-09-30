import express from "express";
import { authMiddleware, adminMiddleware } from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getUserOrders,
  getHotelOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

// Public routes (authenticated users)
router.post("/", authMiddleware, createOrder); // Create order
router.get("/my-orders", authMiddleware, getUserOrders); // Get user's orders

// Hotel owner or admin routes
router.get("/hotel/:hotelId", authMiddleware, adminMiddleware, getHotelOrders); // Get hotel orders

// Admin-only routes
router.get("/", authMiddleware, adminMiddleware, getAllOrders); // Get all orders
router.patch("/:orderId", authMiddleware, adminMiddleware, updateOrderStatus); // Update order status

export default router;