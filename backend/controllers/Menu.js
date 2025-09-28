// controllers/Menu.js
import Hotel from "../models/RegisterHotel.js" // Make sure this import is correct

export const addMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, category, price, thaliEligible, type, items } = req.body;
  
  if (!name || !category || typeof price !== "number") {
    return res.status(400).json({ message: "name, category and numeric price are required" });
  }
  
  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    
    const menuItem = { 
      name, 
      category, 
      price, 
      thaliEligible: !!thaliEligible,
      type: type || 'regular'
    };
    
    // Add items array for thali type
    if (type === 'thali' && items && Array.isArray(items)) {
      menuItem.items = items;
    }
    
    hotel.menu.push(menuItem);
    await hotel.save();
    
    res.status(201).json({ message: "Menu item added", data: hotel });
  } catch (error) {
    console.error("Error adding menu item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateMenuItem = async (req, res) => {
  const { id: hotelId, menuItemId } = req.params; // Get menuItemId from URL params
  const { name, category, price, thaliEligible, type, items } = req.body;
  
  if (!name || !category || typeof price !== "number") {
    return res.status(400).json({ message: "name, category, and numeric price are required" });
  }
  
  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    
    const item = hotel.menu.id(menuItemId);
    if (!item) return res.status(404).json({ message: "Menu item not found" });
    
    item.name = name;
    item.category = category;
    item.price = price;
    item.thaliEligible = !!thaliEligible;
    item.type = type || item.type;
    
    // Update items array for thali type
    if (type === 'thali' && items && Array.isArray(items)) {
      item.items = items;
    }
    
    await hotel.save();
    
    res.status(200).json({ message: "Menu item updated", data: hotel });
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteMenuItem = async (req, res) => {
  const { id: hotelId, menuItemId } = req.params; // Get menuItemId from URL params
  
  if (!menuItemId) {
    return res.status(400).json({ message: "menuItemId is required" });
  }
  
  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    
    const item = hotel.menu.id(menuItemId);
    if (!item) return res.status(404).json({ message: "Menu item not found" });
    
    // Use pull method instead of remove (which is deprecated)
    hotel.menu.pull({ _id: menuItemId });
    await hotel.save();
    
    res.status(200).json({ message: "Menu item deleted", data: hotel });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};