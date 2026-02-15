import express from "express";
import { registerUser, loginUser, getUser } from "../controllers/auth1.controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

const router = express.Router();

// Routes related to authentication & authorization
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getuser",authMiddleware, getUser);


export default router;