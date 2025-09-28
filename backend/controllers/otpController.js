import User from "../models/users.js";
import { generateOTP } from "../utils/otpGenerator.js";

const sendOTP = (to, otp) => {
  console.log(`OTP for ${to}: ${otp}`);
};

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 min expiry
    await user.save();

    sendOTP(email, otp); // replace with real email/SMS sender later

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
