//backend/middleware/adminMiddleware
import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};
