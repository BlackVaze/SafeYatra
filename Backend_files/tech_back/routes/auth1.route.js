import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  updateEmergencyContacts,
  forgotPassword,      
  resetPassword,     
} from "../controllers/auth1.controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

const router = express.Router();

// Auth
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
});
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/getuser", authMiddleware, getUser);
router.put("/updateuser", authMiddleware, updateUser);
router.put("/emergency-contacts", authMiddleware, updateEmergencyContacts);

export default router;