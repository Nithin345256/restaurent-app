import Hotel from "../models/RegisterHotel.js";

// Create/Register Hotel
export const createHotel = async (req, res) => {
  const { HotelName, place, address, options, photo } = req.body;

  if (!HotelName || !place || !address || !options || !photo) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingHotel = await Hotel.findOne({ HotelName });
    if (existingHotel) {
      return res.status(400).json({ message: "Hotel already exists" });
    }

    const allowed = ["veg", "nonveg"];
    const normalizedOptions = Array.isArray(options)
      ? options.filter((o) => allowed.includes(String(o).toLowerCase()))
      : [String(options).toLowerCase()].filter((o) => allowed.includes(o));

    if (!normalizedOptions.length) {
      return res.status(400).json({ message: "Options must include at least one of: veg, nonveg" });
    }

    const newHotel = new Hotel({ HotelName, place, address, options: normalizedOptions, photo });
    await newHotel.save();

    res.status(201).json({ message: "Hotel registered successfully", hotel: newHotel });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all Hotels
export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get single Hotel by ID including menu
export const getHotel = async (req, res) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Update Hotel by ID
export const updateHotel = async (req, res) => {
  const { id } = req.params;
  try {
    const payload = { ...req.body };
    if (payload.options) {
      const allowed = ["veg", "nonveg"];
      payload.options = Array.isArray(payload.options)
        ? payload.options.filter((o) => allowed.includes(String(o).toLowerCase()))
        : [String(payload.options).toLowerCase()].filter((o) => allowed.includes(o));
    }
    const updatedHotel = await Hotel.findByIdAndUpdate(id, payload, { new: true });
    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json({ message: "Hotel updated successfully", hotel: updatedHotel });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Hotel by ID
export const deleteHotel = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(id);
    if (!deletedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
