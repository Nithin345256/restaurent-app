import Hotel from "../models/Hotel.js";
import CommonMenuItem from "../models/commonMenu.js";
import { uploadFile } from "../utils/fileUpload.js";

// Create/Register Hotel (First time only)
// In your HotelController.js - createHotel function

// In your HotelController.js - createHotel function

export const createHotel = async (req, res) => {
  try {
    console.log('=== Hotel Registration Request ===');
    console.log('Body:', req.body);
    console.log('File:', req.file);
    console.log('User:', req.user);
    
    const { name, place, address, lat, long } = req.body;
    let { options } = req.body;

    // Validate required fields
    if (!name) {
      console.log('Validation failed: name missing');
      return res.status(400).json({ message: "Name is required" });
    }
    
    if (!place) {
      console.log('Validation failed: place missing');
      return res.status(400).json({ message: "Place is required" });
    }
    
    if (!address) {
      console.log('Validation failed: address missing');
      return res.status(400).json({ message: "Address is required" });
    }

    // Handle options - it comes as a JSON string from frontend
    if (typeof options === 'string') {
      try {
        options = JSON.parse(options);
        console.log('Parsed options:', options);
      } catch (e) {
        console.error('Failed to parse options:', e);
        return res.status(400).json({
          message: "Invalid options format",
        });
      }
    }
    
    if (!Array.isArray(options)) {
      options = [options];
    }

    if (!options || options.length === 0) {
      console.log('Validation failed: options missing or empty');
      return res.status(400).json({
        message: "At least one option (veg/nonveg) is required",
      });
    }

    // Validate photo
    if (!req.file) {
      console.log('Validation failed: photo missing');
      return res.status(400).json({
        message: "Restaurant photo is required",
      });
    }
    
    console.log('Photo received:', {
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    // Check if user already has a hotel
    const existingHotel = await Hotel.findOne({ userId: req.user.userId });
    if (existingHotel) {
      console.log('Validation failed: user already has a hotel');
      return res.status(400).json({
        message: "You have already registered a hotel",
      });
    }

    // Create hotel
    const hotel = new Hotel({
      userId: req.user.userId,
      name,
      place,
      address,
      lat: parseFloat(lat) || 0,
      long: parseFloat(long) || 0,
      options,
      photo: req.file.path, // Cloudinary URL or local path
      menu: [],
    });

    await hotel.save();

    console.log('Hotel created successfully:', {
      id: hotel._id,
      name: hotel.name,
      options: hotel.options,
    });

    res.status(201).json({
      message: "Hotel registered successfully",
      hotel,
    });
  } catch (error) {
    console.error("Create hotel error:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      message: "Failed to register hotel",
      error: error.message,
    });
  }
};

// Get all Hotels with filtering
export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().select('-menu');
    res.status(200).json(hotels);
  } catch (error) {
    console.error("Get hotels error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Get Hotels by Type (veg/nonveg/all)
export const getHotelByType = async (req, res) => {
  const { type } = req.query;

  try {
    let hotels;
    if (!type || type === "all") {
      hotels = await Hotel.find().select('-menu');
    } else if (type === "veg" || type === "nonveg") {
      hotels = await Hotel.find({ options: type }).select('-menu');
    } else {
      return res.status(400).json({ 
        message: "Invalid type. Use 'veg', 'nonveg', or 'all'" 
      });
    }
    res.status(200).json(hotels);
  } catch (error) {
    console.error("Get hotels by type error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Get single Hotel by User ID
export const getUserHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ userId: req.user.id });
    if (!hotel) {
      return res.status(404).json({ 
        message: "No hotel found for this user" 
      });
    }
    res.status(200).json(hotel);
  } catch (error) {
    console.error("Get user hotel error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Get single Hotel by ID with full menu
export const getHotelById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json(hotel);
  } catch (error) {
    console.error("Get hotel by ID error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Add menu item to hotel (without photo - admin will add later)
export const addMenuItem = async (req, res) => {
  const { name, category, foodType, price, thaliEligible, type, items } = req.body;
  const userId = req.user.id;

  if (!name || !category || !foodType || typeof price !== "number") {
    return res.status(400).json({ 
      message: "Name, category, foodType, and numeric price are required" 
    });
  }

  if (!["veg", "nonveg"].includes(foodType)) {
    return res.status(400).json({ 
      message: "foodType must be 'veg' or 'nonveg'" 
    });
  }

  try {
    const hotel = await Hotel.findOne({ userId });
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    if (hotel.userId.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: "Unauthorized: Only the hotel owner or admin can add menu items" 
      });
    }

    const menuItem = {
      name,
      category,
      foodType,
      price,
      thaliEligible: !!thaliEligible,
      type: type || "single",
      items: items || [],
      photo: null,
      photoApproved: false,
    };

    hotel.menu.push(menuItem);
    await hotel.save();
    res.status(201).json({ 
      message: "Menu item added. Waiting for admin to approve photo.", 
      hotel 
    });
  } catch (error) {
    console.error("Add menu item error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Get common menu items (added by admin)
export const getCommonMenuItems = async (req, res) => {
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

// Add common menu item to hotel's menu
export const addCommonItemToMenu = async (req, res) => {
  const { commonItemId } = req.params;
  const { price } = req.body;
  const userId = req.user.id;

  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({ 
      message: "Valid price is required" 
    });
  }

  try {
    const hotel = await Hotel.findOne({ userId });
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const commonItem = await CommonMenuItem.findById(commonItemId);
    if (!commonItem) {
      return res.status(404).json({ 
        message: "Common menu item not found" 
      });
    }

    // Check if item already exists in hotel menu
    const existingItem = hotel.menu.find(item => 
      item.name.toLowerCase() === commonItem.name.toLowerCase()
    );
    if (existingItem) {
      return res.status(400).json({ 
        message: "This item already exists in your menu" 
      });
    }

    const menuItem = {
      name: commonItem.name,
      category: commonItem.category,
      foodType: commonItem.foodType,
      price,
      thaliEligible: commonItem.thaliEligible,
      type: commonItem.type,
      items: commonItem.items,
      photo: commonItem.photo,
      photoApproved: true,
    };

    hotel.menu.push(menuItem);
    await hotel.save();
    res.status(201).json({ 
      message: "Common menu item added to your hotel", 
      hotel 
    });
  } catch (error) {
    console.error("Add common item error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Update Hotel by ID
export const updateHotel = async (req, res) => {
  const { id } = req.params;
  const { name, place, address, options } = req.body;

  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    if (hotel.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: "Unauthorized: Only the hotel owner or admin can update this hotel" 
      });
    }

    const payload = {};
    if (name) payload.name = name;
    if (place) payload.place = place;
    if (address) payload.address = address;
    
    if (req.file) {
      payload.photo = await uploadFile(req.file);
    }

    if (options) {
      const allowed = ["veg", "nonveg"];
      payload.options = Array.isArray(options)
        ? options.filter((o) => allowed.includes(String(o).toLowerCase()))
        : [String(options).toLowerCase()].filter((o) => allowed.includes(o));
      
      if (!payload.options.length) {
        return res.status(400).json({ 
          message: "Options must include at least one of: veg, nonveg" 
        });
      }
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(
      id, 
      { $set: payload }, 
      { new: true }
    );
    res.status(200).json({ 
      message: "Hotel updated successfully", 
      hotel: updatedHotel 
    });
  } catch (error) {
    console.error("Update hotel error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Delete Hotel by ID
export const deleteHotel = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    if (hotel.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: "Unauthorized: Only the hotel owner or admin can delete this hotel" 
      });
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

// Update menu item (price, details)
export const updateMenuItem = async (req, res) => {
  const { id, menuId } = req.params;
  const { name, category, foodType, price, thaliEligible, type, items } = req.body;

  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    if (hotel.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: "Unauthorized" 
      });
    }

    const menuItem = hotel.menu.id(menuId);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    if (name) menuItem.name = name;
    if (category) menuItem.category = category;
    if (foodType) menuItem.foodType = foodType;
    if (typeof price === "number") menuItem.price = price;
    if (thaliEligible !== undefined) menuItem.thaliEligible = thaliEligible;
    if (type) menuItem.type = type;
    if (items) menuItem.items = items;

    await hotel.save();
    res.status(200).json({ 
      message: "Menu item updated successfully", 
      hotel 
    });
  } catch (error) {
    console.error("Update menu item error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Delete Menu Item by ID
export const deleteMenuItem = async (req, res) => {
  const { id, menuId } = req.params;

  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    if (hotel.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: "Unauthorized: Only the hotel owner or admin can delete menu items" 
      });
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

// Calculate total with delivery and catering
export const calculateTotal = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const { selectedItems, deliveryLocation, cateringService } = req.body;

    if (!hotelId || !selectedItems || !Array.isArray(selectedItems)) {
      return res.status(400).json({ 
        message: 'Hotel ID and valid selectedItems array are required' 
      });
    }

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    let itemsTotal = 0;
    const itemDetails = [];

    for (const item of selectedItems) {
      const menuItem = hotel.menu.id(item.menuItemId);
      if (menuItem) {
        const quantity = item.quantity || 1;
        const itemTotal = menuItem.price * quantity;
        itemsTotal += itemTotal;
        
        itemDetails.push({
          name: menuItem.name,
          quantity,
          price: menuItem.price,
          total: itemTotal
        });
      }
    }

    // Calculate delivery charges based on distance from Sagar, Karnataka
    let deliveryCharges = 0;
    let distance = 0;
    let estimatedTime = 0;

    if (deliveryLocation && deliveryLocation.lat && deliveryLocation.long) {
      const sagarLat = 14.1674;
      const sagarLong = 75.0389;
      
      distance = calculateDistance(
        sagarLat, 
        sagarLong, 
        deliveryLocation.lat, 
        deliveryLocation.long
      );
      
      deliveryCharges = Math.ceil(distance) * 20;
      estimatedTime = Math.ceil(distance * 10); // 10 min per km
    }

    // Add catering service charges
    const cateringCharges = cateringService ? 1500 : 0;

    const total = itemsTotal + deliveryCharges + cateringCharges;

    res.status(200).json({ 
      message: 'Total calculated',
      breakdown: {
        items: itemDetails,
        itemsTotal,
        deliveryCharges,
        distance: Math.ceil(distance),
        estimatedTime,
        cateringCharges,
        total
      }
    });
  } catch (error) {
    console.error("Calculate total error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Helper function to calculate distance using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}