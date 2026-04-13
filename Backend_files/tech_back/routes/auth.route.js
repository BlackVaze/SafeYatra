import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  updateEmergencyContacts,
  forgotPassword,
  resetPassword,
  updateSavedLocations
} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Protected routes
router.get("/getuser", authMiddleware, getUser);
router.put("/saved-locations", authMiddleware, updateSavedLocations);
router.put("/updateuser", authMiddleware, updateUser);
router.put("/emergency-contacts", authMiddleware, updateEmergencyContacts);

export default router;