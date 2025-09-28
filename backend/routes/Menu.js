import { addMenuItem, updateMenuItem, deleteMenuItem } from "../controllers/Menu.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import express from "express"

const router = express.Router()

// POST /api/hotel/:id/menu
router.post("/:id/menu", authMiddleware, addMenuItem);

// PUT /api/hotel/:id/menu/:menuItemId
router.put("/:id/menu/:menuItemId", authMiddleware, updateMenuItem);

// DELETE /api/hotel/:id/menu/:menuItemId
router.delete("/:id/menu/:menuItemId", authMiddleware, deleteMenuItem);

export default router;