import { getHotelByType } from "../controllers/getHotelByType.js";
import express from "express";
const router = express.Router();

// Get hotels by type
router.get("/", getHotelByType);

export default router;