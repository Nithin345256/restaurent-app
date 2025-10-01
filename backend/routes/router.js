import express from 'express';
import { upload, multerErrorHandler } from '../utils/fileUpload.js';
import Hotel from '../models/Hotel.js';
import { 
  register, 
  login, 
  getUserRole,
  getUserProfile,
  updateUserProfile,
  changePassword 
} from '../controllers/user.js';
import {
  createHotel,
  getHotels,
  getHotelByType,
  getHotelById,
  getUserHotel,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  updateHotel,
  deleteHotel,
  calculateTotal,
  getCommonMenuItems,
  addCommonItemToMenu,
} from '../controllers/HotelController.js';
import {
  getAllUsers,
  getAllHotels,
  getHotelsWithPendingItems,
  addPhotoToMenuItem,
  deleteHotelById,
  createCommonMenuItem,
  getAllCommonMenuItems,
  updateCommonMenuItem,
  deleteCommonMenuItem,
  deleteMenuItem as adminDeleteMenuItem,
  getAllOrders as adminGetAllOrders,
  updateOrderStatus as adminUpdateOrderStatus,
  getDashboardStats,
} from '../controllers/Admincontoller.js';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  getHotelOrders,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder,
  getAllOrders,
} from '../controllers/orderController.js';
import { 
  authMiddleware, 
  adminMiddleware, 
  hotelMiddleware 
} from '../middlewares/authMiddleware.js';

const router = express.Router();

// ==================== AUTH ROUTES ====================
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/role', authMiddleware, getUserRole);
router.get('/auth/profile', authMiddleware, getUserProfile);
router.put('/auth/profile', authMiddleware, updateUserProfile);
router.put('/auth/change-password', authMiddleware, changePassword);

// ==================== HOTEL ROUTES (PUBLIC) ====================
router.get('/hotels', getHotels); // Get all hotels
router.get('/hotels/type', getHotelByType); // Get hotels by type (veg/nonveg/all)
router.get('/hotels/:id', getHotelById); // Get single hotel with full menu

// ==================== HOTEL ROUTES (AUTHENTICATED) ====================
router.post('/hotels', authMiddleware, hotelMiddleware, upload.single('photo'), multerErrorHandler, createHotel); // Create hotel (hotel role only, with auth)
router.get('/hotels/my-hotel/details', authMiddleware, hotelMiddleware, getUserHotel); // Get user's hotel
router.put('/hotels/:id', authMiddleware, upload.single('photo'), updateHotel); // Update hotel
router.delete('/hotels/:id', authMiddleware, deleteHotel); // Delete hotel

// ==================== MENU ROUTES ====================
router.post('/hotels/:id/menu', authMiddleware, hotelMiddleware, addMenuItem); // Add menu item (without photo)
router.post('/hotels/add-menu-item', authMiddleware, hotelMiddleware, upload.none(), async (req, res, next) => {
  try {
    // Debug: log incoming request body and params
    console.log('[add-menu-item] req.body:', req.body);
    console.log('[add-menu-item] req.params:', req.params);
    // Try to get hotelId from body, params, or authenticated user
    let hotelId = req.body.hotelId || req.body.hotelid || req.params.hotelId || req.params.hotelid;
    if (!hotelId && req.body.id) hotelId = req.body.id;
    if (!hotelId && req.user && req.user.userId) hotelId = req.user.userId.toString();
    // Accept all menu fields from body
    const menuData = { ...req.body };
    // Support both foodType and foodtype (case-insensitive)
    const foodType = menuData.foodType || menuData.foodtype;
    const name = menuData.name && menuData.name.trim();
    const category = menuData.category && menuData.category.trim();
    let price = menuData.price;
    if (typeof price === 'string') price = price.trim();
    // Validate required fields
    if (!hotelId || !name || !category || !foodType || !price) {
      return res.status(400).json({ error: 'hotelId, name, category, foodType, and price are required', debug: { hotelId, name, category, foodType, price, menuData } });
    }
    // Validate price is numeric
    if (isNaN(Number(price))) {
      return res.status(400).json({ error: 'Price must be a number', debug: { price } });
    }
    // Authorization: only hotel owner or admin can add menu items
    // If hotelMiddleware sets req.hotel, use its _id for owner check
    let ownerHotelId = hotelId;
    if (req.hotel && req.hotel._id) {
      ownerHotelId = req.hotel._id.toString();
    } else if (req.user && req.user.userId) {
      // Fallback: fetch hotel for user
      const userHotel = await Hotel.findOne({ owner: req.user.userId });
      if (userHotel && userHotel._id) ownerHotelId = userHotel._id.toString();
    }
    const isHotelOwner = req.user && req.user.userId && ownerHotelId && req.user.userId.toString() === ownerHotelId;
    const isAdmin = req.user && req.user.role === 'admin';
    if (!isHotelOwner && !isAdmin) {
      return res.status(403).json({ error: 'Unauthorized: only the hotel owner or admin can add menu items', debug: { userId: req.user.userId, ownerHotelId, role: req.user.role } });
    }
    req.params.id = hotelId;
    req.body = { ...menuData, name, category, foodType, price: Number(price) };
    return await addMenuItem(req, res, next);
  } catch (err) {
    next(err);
  }
});
router.put('/hotels/:id/menu/:menuId', authMiddleware, hotelMiddleware, updateMenuItem); // Update menu item
router.delete('/hotels/:id/menu/:menuId', authMiddleware, deleteMenuItem); // Delete menu item

// ==================== COMMON MENU ROUTES ====================
router.get('/common-menu', authMiddleware, getCommonMenuItems); // Get all common menu items
router.post('/hotels/add-common-item/:commonItemId', authMiddleware, hotelMiddleware, addCommonItemToMenu); // Add common item to hotel menu

// ==================== CALCULATE TOTAL ====================
router.post('/hotels/:hotelId/calculate-total', calculateTotal); // Calculate total with delivery & catering

// ==================== ORDER ROUTES (USER) ====================
router.post('/orders', authMiddleware, createOrder); // Create order
router.get('/orders/my-orders', authMiddleware, getUserOrders); // Get user's orders
router.get('/orders/:orderId', authMiddleware, getOrderById); // Get single order
router.put('/orders/:orderId/cancel', authMiddleware, cancelOrder); // Cancel order

// ==================== ORDER ROUTES (HOTEL) ====================
router.get('/orders/hotel/all', authMiddleware, hotelMiddleware, getHotelOrders); // Get hotel's orders
router.put('/orders/:orderId/status', authMiddleware, updateOrderStatus); // Update order status (hotel/admin)

// ==================== ADMIN ROUTES ====================
// User Management
router.get('/admin/users', authMiddleware, adminMiddleware, getAllUsers);

// Hotel Management
router.get('/admin/hotels', authMiddleware, adminMiddleware, getAllHotels);
router.get('/admin/hotels/pending-items', authMiddleware, adminMiddleware, getHotelsWithPendingItems);
router.post('/admin/hotels/:hotelId/menu/:menuId/photo', authMiddleware, adminMiddleware, upload.single('photo'), addPhotoToMenuItem);
router.delete('/admin/hotels/:id', authMiddleware, adminMiddleware, deleteHotelById);
router.delete('/admin/hotels/:hotelId/menu/:menuId', authMiddleware, adminMiddleware, adminDeleteMenuItem);

// Common Menu Management
router.post('/admin/common-menu', authMiddleware, adminMiddleware, upload.single('photo'), createCommonMenuItem);
router.get('/admin/common-menu', authMiddleware, adminMiddleware, getAllCommonMenuItems);
router.put('/admin/common-menu/:id', authMiddleware, adminMiddleware, upload.single('photo'), updateCommonMenuItem);
router.delete('/admin/common-menu/:id', authMiddleware, adminMiddleware, deleteCommonMenuItem);

// Order Management
router.get('/admin/orders', authMiddleware, adminMiddleware, adminGetAllOrders);
router.put('/admin/orders/:orderId/status', authMiddleware, adminMiddleware, adminUpdateOrderStatus);
router.put('/admin/orders/:orderId/payment', authMiddleware, adminMiddleware, updatePaymentStatus);

// Dashboard
router.get('/admin/dashboard', authMiddleware, adminMiddleware, getDashboardStats);

export default router;