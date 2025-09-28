import jwt from "jsonwebtoken"

export const authMiddleware = (req,res,next)=>{
    const authHeader = req.header("Authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : authHeader.trim();

    if(!token)
    {
        return res.status(401).json({message:"no token, authorization denied"});
    }

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    } catch (error) {
        return res.status(401).json({message:"token is invalid"});
    }
};

export const getUserRole = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  return res.status(200).json({
    message: "Role fetched successfully",
    role: req.user.role,
  });
};