import User from "../models/users.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
const register = async (req, res) => {
  try {
    const { FirstName, SecondName, email, phonenumber, password, role } = req.body;

    if (!FirstName || !SecondName || !email || !phonenumber || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if role is valid
    if (!["user", "hotel"].includes(role)) {
      return res.status(400).json({ message: "Invalid role. Must be 'user' or 'hotel'" });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // create user
    const newUser = new User({
      FirstName,
      SecondName,
      email,
      phonenumber,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        FirstName: newUser.FirstName,
        SecondName: newUser.SecondName,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // include role in token payload
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        FirstName: user.FirstName,
        SecondName: user.SecondName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export { register, login };
