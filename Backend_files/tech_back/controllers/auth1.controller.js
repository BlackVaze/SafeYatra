import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";  

// 📝 Register Controller
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this username or email.",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newlyCreatedUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newlyCreatedUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again.",
    });
  }
};

// 🔐 Login Controller
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist.",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30m" }
    );

   return res.cookie("token", accessToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	}).json({
        success: true,
          message: `Welcome back ${user.username}`,
          user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again.",
    });
  }
};

export const getUser = async (req, res) => {
    try {
     const userId = req.userId
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User doesn't exist.",
        });
      }
    return res.status(200).json({
        message: "user succesfully get",
        success : true,
        user
    })
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "An error occurred. Please try again.",
      });
    }
  };