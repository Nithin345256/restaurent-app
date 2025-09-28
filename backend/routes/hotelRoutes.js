import express from "express";
import {
  createHotel,
  getHotels,
  getHotel,
  updateHotel,
  deleteHotel
} from "../controllers/HotelController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register a hotel (only hotel role can register)
router.post("/", authMiddleware, createHotel);

// Get all hotels
router.get("/", getHotels);

// Get single hotel
router.get("/:id", getHotel);


// Update hotel by ID (only hotel role)
router.put("/:id", authMiddleware, updateHotel);

// Delete hotel by ID (only hotel role)
router.delete("/:id", authMiddleware, deleteHotel);

export default router;
