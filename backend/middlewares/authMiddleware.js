import jwt from "jsonwebtoken";
import User from "../models/users.js";

// Authentication Middleware
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ 
        message: "Access denied. No token provided." 
      });
    }

    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || "your_jwt_secret_key"
    );

    // Handle admin token
    if (decoded.id === 'admin') {
      req.user = {
        id: 'admin',
        role: 'admin'
      };
      return next();
    }

    // Handle regular user token
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ 
        message: "User not found" 
      });
    }

    req.user = {
      id: user._id,
      _id: user._id,
      role: user.role,
      email: user.email,
      firstName: user.firstName,
      secondName: user.secondName,
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: "Token expired. Please login again." 
      });
    }
    return res.status(401).json({ 
      message: "Invalid token" 
    });
  }
};

// Admin Middleware
export const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      message: "Authentication required" 
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      message: "Access denied. Admin privileges required." 
    });
  }

  next();
};

// Hotel Middleware
export const hotelMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      message: "Authentication required" 
    });
  }

  if (req.user.role !== 'hotel' && req.user.role !== 'admin') {
    return res.status(403).json({ 
      message: "Access denied. Hotel account required." 
    });
  }

  next();
};

// User Role Getter
export const getUserRole = async (req, res) => {
  try {
    if (req.user.id === 'admin') {
      return res.status(200).json({
        role: 'admin',
        user: {
          id: 'admin',
          firstName: 'Admin',
          secondName: 'User',
          email: process.env.ADMIN_EMAIL || "admin@foodcatering.com",
          role: 'admin',
        }
      });
    }

    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      role: user.role,
      user: {
        id: user._id,
        firstName: user.firstName,
        secondName: user.secondName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      }
    });
  } catch (error) {
    console.error("Get user role error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};