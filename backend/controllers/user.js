import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { firstName, secondName, email, phoneNumber, password, role } = req.body;

  // Validation
  if (!firstName || !secondName || !email || !phoneNumber || !password) {
    return res.status(400).json({
      message: "All fields (firstName, secondName, email, phoneNumber, password) are required",
    });
  }

  // Prevent admin registration
  if (role === "admin") {
    return res.status(403).json({
      message: "Admin accounts cannot be created through registration",
    });
  }

  // Validate role
  const validRoles = ["user", "hotel"];
  if (role && !validRoles.includes(role)) {
    return res.status(400).json({
      message: "Invalid role. Must be 'user' or 'hotel'",
    });
  }

  // Email validation
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Phone validation
  const phoneRegex = /^\+?[\d\s-]{7,15}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).json({
      message: "Phone number must be 7-15 digits, with optional +, spaces, or hyphens",
    });
  }

  // Password strength validation
  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email: email.toLowerCase() }, { phoneNumber }] });
    if (existingUser) {
      const field = existingUser.email.toLowerCase() === email.toLowerCase() ? "email" : "phone number";
      return res.status(400).json({
        message: `User already exists with this ${field}`,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Registering user ${email} with hashed password: ${hashedPassword}`);

    // Create new user
    const newUser = new User({
      firstName,
      secondName,
      email: email.toLowerCase(),
      phoneNumber,
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        secondName: newUser.secondName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        message: `User already exists with this ${field}`,
      });
    }
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// import User from "../models/User.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  try {
    // Admin login via .env credentials
    if (
      email.toLowerCase() === (process.env.ADMIN_EMAIL || '').toLowerCase() &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { id: 'admin', role: 'admin' },
        process.env.JWT_SECRET || "your_jwt_secret_key",
        { expiresIn: "7d" }
      );
      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: 'admin',
          firstName: 'Admin',
          secondName: '',
          email: process.env.ADMIN_EMAIL,
          phoneNumber: '',
          role: 'admin',
        },
      });
    }

    // Find user (case-insensitive email lookup)
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.error(`Login failed: No user found with email ${email}`);
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Verify password
    console.log(`Verifying password for ${email}, provided: ${password}, stored hash: ${user.password}`);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error(`Login failed: Invalid password for email ${email}`);
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        secondName: user.secondName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get user role (for checking authentication)
export const getUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
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
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Get user role error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -otp -otpExpires");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      id: user._id,
      firstName: user.firstName,
      secondName: user.secondName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    });
  } catch (error) {
    console.error("Get user profile error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  const { firstName, secondName, phoneNumber } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (firstName) user.firstName = firstName;
    if (secondName) user.secondName = secondName;
    if (phoneNumber) {
      const phoneRegex = /^\+?[\d\s-]{7,15}$/;
      if (!phoneRegex.test(phoneNumber)) {
        return res.status(400).json({
          message: "Phone number must be 7-15 digits, with optional +, spaces, or hyphens",
        });
      }

      // Check if phoneNumber is already taken
      const existingPhone = await User.findOne({ phoneNumber, _id: { $ne: user._id } });
      if (existingPhone) {
        return res.status(400).json({
          message: "Phone number is already registered to another user",
        });
      }

      user.phoneNumber = phoneNumber;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        secondName: user.secondName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Phone number is already registered",
      });
    }
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Change password
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      message: "Current password and new password are required",
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      message: "New password must be at least 6 characters long",
    });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Current password is incorrect",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};