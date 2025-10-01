import User from "../models/users.js";
import Hotel from "../models/Hotel.js";
import CommonMenuItem from "../models/commonMenu.js";
import Order from "../models/Order.js";
import { uploadFile } from "../utils/fileUpload.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Get all hotels with user details
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate('userId', 'firstName secondName email phone');
    res.status(200).json(hotels);
  } catch (error) {
    console.error("Get all hotels error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Get all hotels with pending menu items (items without approved photos)
export const getHotelsWithPendingItems = async (req, res) => {
  try {
    // Get all hotels
    const hotels = await Hotel.find().populate('userId', 'firstName secondName email phone');
    // Filter to only show hotels with pending items
    const hotelsWithPending = hotels.map(hotel => {
      const pendingItems = hotel.menu.filter(item => item.photoApproved === false);
      return {
        ...hotel.toObject(),
        menu: pendingItems
      };
    }).filter(hotel => hotel.menu.length > 0);

    res.status(200).json(hotelsWithPending);
  } catch (error) {
    console.error("Get pending items error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Add/Update photo to menu item and approve
export const addPhotoToMenuItem = async (req, res) => {
  const { hotelId, menuId } = req.params;

  if (!req.file) {
    return res.status(400).json({ message: "Photo is required" });
  }

  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const menuItem = hotel.menu.id(menuId);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    const photoUrl = await uploadFile(req.file);
    menuItem.photo = photoUrl;
    menuItem.photoApproved = true;

    await hotel.save();
    res.status(200).json({ 
      message: "Photo added and menu item approved", 
      hotel 
    });
  } catch (error) {
    console.error("Add photo error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Delete hotel by ID (admin only)
export const deleteHotelById = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    await hotel.deleteOne();
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    console.error("Delete hotel error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Create common menu item (admin only)
export const createCommonMenuItem = async (req, res) => {
  try {
    console.log('=== CREATE COMMON MENU ITEM ===');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('File:', req.file);
    console.log('Files:', req.files);
    console.log('User:', req.user);
    if (req.file) {
      console.log('File fieldname:', req.file.fieldname);
      console.log('File originalname:', req.file.originalname);
      console.log('File mimetype:', req.file.mimetype);
      console.log('File path:', req.file.path);
      console.log('File size:', req.file.size);
    }
    const { name, category, foodType, thaliEligible } = req.body;
    // Validate required fields
    if (!name || !category || !foodType) {
      console.error('❌ Missing required fields:', { name, category, foodType });
      return res.status(400).json({ 
        error: 'Name, category, and foodType are required',
        received: { name, category, foodType }
      });
    }
    if (!req.file) {
      console.error('❌ No file uploaded');
      return res.status(400).json({ error: 'Photo is required' });
    }
  // Import the correct CommonMenuItem model
  const CommonMenuItem = (await import('../models/commonMenu.js')).default || (await import('../models/commonMenu.js')).CommonMenuItem || (await import('../models/commonMenu.js')).default;
    const commonItem = new CommonMenuItem({
      name: name.trim(),
      category: category.trim(),
      foodType: foodType.toLowerCase(),
      thaliEligible: thaliEligible === 'true' || thaliEligible === true,
      photo: `/uploads/${req.file.filename}`, // Adjust path as needed
    });
    await commonItem.save();
    console.log('✓ Common menu item created:', commonItem);
    res.status(201).json({ 
      message: 'Common menu item created successfully',
      commonItem 
    });
  } catch (error) {
    console.error('❌ [createCommonMenuItem] Error:', error);
    res.status(500).json({ 
      error: 'Failed to create common menu item',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Get all common menu items
export const getAllCommonMenuItems = async (req, res) => {
  try {
    const commonItems = await CommonMenuItem.find();
    res.status(200).json(commonItems);
  } catch (error) {
    console.error("Get common menu items error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Update common menu item
export const updateCommonMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, category, foodType, thaliEligible, type, items } = req.body;

  try {
    const commonItem = await CommonMenuItem.findById(id);
    if (!commonItem) {
      return res.status(404).json({ 
        message: "Common menu item not found" 
      });
    }

    if (name) commonItem.name = name;
    if (category) commonItem.category = category;
    if (foodType) commonItem.foodType = foodType;
    if (thaliEligible !== undefined) commonItem.thaliEligible = thaliEligible;
    if (type) commonItem.type = type;
    if (items) commonItem.items = items;

    if (req.file) {
      commonItem.photo = await uploadFile(req.file);
    }

    await commonItem.save();
    res.status(200).json({ 
      message: "Common menu item updated successfully", 
      commonItem 
    });
  } catch (error) {
    console.error("Update common menu item error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Delete common menu item
export const deleteCommonMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    const commonItem = await CommonMenuItem.findById(id);
    if (!commonItem) {
      return res.status(404).json({ 
        message: "Common menu item not found" 
      });
    }

    await commonItem.deleteOne();
    res.status(200).json({ 
      message: "Common menu item deleted successfully" 
    });
  } catch (error) {
    console.error("Delete common menu item error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Delete menu item from hotel (admin)
export const deleteMenuItem = async (req, res) => {
  const { hotelId, menuId } = req.params;

  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const menuItem = hotel.menu.id(menuId);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    hotel.menu.pull(menuId);
    await hotel.save();
    res.status(200).json({ 
      message: "Menu item deleted successfully", 
      hotel 
    });
  } catch (error) {
    console.error("Delete menu item error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'firstName secondName email phone')
      .populate('hotel', 'name place address')
      .sort({ createdAt: -1 });
    
    res.status(200).json(orders);
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Update order status (admin)
export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status, paymentStatus } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (status) order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();
    res.status(200).json({ 
      message: "Order updated successfully", 
      order 
    });
  } catch (error) {
    console.error("Update order error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Get dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalHotels = await Hotel.countDocuments();
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const completedOrders = await Order.countDocuments({ status: 'delivered' });
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    res.status(200).json({
      totalUsers,
      totalHotels,
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};