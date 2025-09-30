import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import Hotel from "../models/Hotel.js";

// Helper function to calculate distance
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

// Create Order
const createOrder = asyncHandler(async (req, res) => {
  const { 
    hotelId, 
    items, 
    deliveryLocation, 
    cateringService, 
    paymentMethod,
    notes 
  } = req.body;

  // Validation
  if (!hotelId || !items || !Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error("Hotel ID and items are required");
  }

  if (!deliveryLocation || !deliveryLocation.lat || !deliveryLocation.long) {
    res.status(400);
    throw new Error("Delivery location with coordinates is required");
  }

  // Find hotel
  const hotel = await Hotel.findById(hotelId);
  if (!hotel) {
    res.status(404);
    throw new Error("Hotel not found");
  }

  // Validate and calculate items total
  let itemsTotal = 0;
  const orderItems = [];

  for (const item of items) {
    const menuItem = hotel.menu.id(item.menuItemId);
    if (!menuItem) {
      res.status(400);
      throw new Error(`Menu item ${item.menuItemId} not found in hotel menu`);
    }

    if (!menuItem.photoApproved) {
      res.status(400);
      throw new Error(`Item ${menuItem.name} is not yet approved by admin`);
    }

    const quantity = item.quantity || 1;
    if (quantity < 1) {
      res.status(400);
      throw new Error("Quantity must be at least 1");
    }

    const itemTotal = menuItem.price * quantity;
    itemsTotal += itemTotal;

    orderItems.push({
      menuItemId: menuItem._id,
      name: menuItem.name,
      quantity,
      price: menuItem.price,
      foodType: menuItem.foodType,
    });
  }

  // Calculate distance from hotel to delivery location
  const distance = calculateDistance(
    hotel.lat,
    hotel.long,
    deliveryLocation.lat,
    deliveryLocation.long
  );

  // Calculate delivery charges (₹20 per km)
  const deliveryCharges = Math.ceil(distance) * 20;

  // Calculate estimated time (10 min per km)
  const estimatedTime = Math.ceil(distance * 10);

  // Calculate catering charges
  const cateringCharges = cateringService ? 1500 : 0;

  // Calculate total
  const total = itemsTotal + deliveryCharges + cateringCharges;

  // Create order
  const order = await Order.create({
    user: req.user._id || req.user.id,
    hotel: hotelId,
    items: orderItems,
    itemsTotal,
    deliveryLocation,
    distance: Math.ceil(distance),
    deliveryCharges,
    estimatedTime,
    cateringService: !!cateringService,
    cateringCharges,
    total,
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: paymentMethod || "cash",
    notes: notes || "",
  });

  // Populate hotel and user details
  await order.populate('hotel', 'name place address photo');
  await order.populate('user', 'firstName secondName email phone');

  res.status(201).json({ 
    message: "Order created successfully", 
    order 
  });
});

// Get User Orders
const getUserOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id || req.user.id;
  
  const orders = await Order.find({ user: userId })
    .populate("hotel", "name place address photo")
    .sort({ createdAt: -1 });

  res.status(200).json({ 
    message: "User orders retrieved successfully", 
    orders 
  });
});

// Get Single Order by ID
const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user._id || req.user.id;

  const order = await Order.findById(orderId)
    .populate("hotel", "name place address photo lat long")
    .populate("user", "firstName secondName email phone");

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Check authorization
  if (order.user._id.toString() !== userId.toString() && req.user.role !== "admin") {
    const hotel = await Hotel.findById(order.hotel._id);
    if (!hotel || hotel.userId.toString() !== userId.toString()) {
      res.status(403);
      throw new Error("Not authorized to view this order");
    }
  }

  res.status(200).json({ 
    message: "Order retrieved successfully", 
    order 
  });
});

// Get Hotel Orders
const getHotelOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id || req.user.id;

  // Find hotel belonging to the user
  const hotel = await Hotel.findOne({ userId });
  if (!hotel) {
    res.status(404);
    throw new Error("Hotel not found for this user");
  }

  const orders = await Order.find({ hotel: hotel._id })
    .populate("user", "firstName secondName email phone")
    .sort({ createdAt: -1 });

  res.status(200).json({ 
    message: "Hotel orders retrieved successfully", 
    orders,
    hotel: {
      id: hotel._id,
      name: hotel.name
    }
  });
});

// Update Order Status (Hotel Owner or Admin)
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const userId = req.user._id || req.user.id;

  const order = await Order.findById(orderId);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Check authorization
  if (req.user.role !== "admin") {
    const hotel = await Hotel.findById(order.hotel);
    if (!hotel || hotel.userId.toString() !== userId.toString()) {
      res.status(403);
      throw new Error("Not authorized to update this order");
    }
  }

  // Validate status
  const validStatuses = ["pending", "confirmed", "preparing", "on_the_way", "delivered", "cancelled"];
  if (!validStatuses.includes(status)) {
    res.status(400);
    throw new Error("Invalid status");
  }

  order.status = status;

  // Auto-update payment status based on order status
  if (status === "delivered") {
    order.paymentStatus = "completed";
  } else if (status === "cancelled") {
    order.paymentStatus = "refunded";
  }

  await order.save();

  res.status(200).json({ 
    message: "Order status updated successfully", 
    order 
  });
});

// Update Payment Status (Admin only)
const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { paymentStatus } = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  const validPaymentStatuses = ["pending", "completed", "failed", "refunded"];
  if (!validPaymentStatuses.includes(paymentStatus)) {
    res.status(400);
    throw new Error("Invalid payment status");
  }

  order.paymentStatus = paymentStatus;
  await order.save();

  res.status(200).json({ 
    message: "Payment status updated successfully", 
    order 
  });
});

// Cancel Order (User or Admin)
const cancelOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user._id || req.user.id;

  const order = await Order.findById(orderId);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Check authorization
  if (req.user.role !== "admin" && order.user.toString() !== userId.toString()) {
    res.status(403);
    throw new Error("Not authorized to cancel this order");
  }

  // Check if order can be cancelled
  if (["delivered", "cancelled"].includes(order.status)) {
    res.status(400);
    throw new Error(`Order cannot be cancelled as it is already ${order.status}`);
  }

  order.status = "cancelled";
  order.paymentStatus = "refunded";
  await order.save();

  res.status(200).json({ 
    message: "Order cancelled successfully", 
    order 
  });
});

// Get All Orders (Admin only)
const getAllOrders = asyncHandler(async (req, res) => {
  const { status, paymentStatus, limit = 50, page = 1 } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (paymentStatus) filter.paymentStatus = paymentStatus;

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const orders = await Order.find(filter)
    .populate("user", "firstName secondName email phone")
    .populate("hotel", "name place address")
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .skip(skip);

  const total = await Order.countDocuments(filter);

  res.status(200).json({ 
    message: "All orders retrieved successfully", 
    orders,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit))
    }
  });
});

export { 
  createOrder, 
  getUserOrders, 
  getOrderById,
  getHotelOrders, 
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder,
  getAllOrders 
};