import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Resend } from "resend";

// 📝 Register Controller
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this username or email.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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
      { expiresIn: "7d" },
    );

    return res
      .cookie("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: `Welcome back ${user.username}`,
        user,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again.",
    });
  }
};

// 👤 Get User
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist.",
      });
    }

    return res.status(200).json({
      message: "User successfully retrieved",
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again.",
    });
  }
};

// ✏️ Update Profile (username, email, phone)
export const updateUser = async (req, res) => {
  try {
    const { username, email, phone } = req.body;

    // Check no other user already owns this username/email
    if (username || email) {
      const conflict = await User.findOne({
        _id: { $ne: req.userId },
        $or: [
          ...(username ? [{ username }] : []),
          ...(email ? [{ email }] : []),
        ],
      });
      if (conflict) {
        return res.status(409).json({
          success: false,
          message: "Username or email is already taken.",
        });
      }
    }

    const updated = await User.findByIdAndUpdate(
      req.userId,
      {
        ...(username && { username }),
        ...(email && { email }),
        ...(phone !== undefined && { phone }),
      },
      { new: true, runValidators: true },
    ).select("-password");

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again.",
    });
  }
};

// 🆘 Update Emergency Contacts
export const updateEmergencyContacts = async (req, res) => {
  try {
    const { contacts } = req.body;

    if (!Array.isArray(contacts)) {
      return res.status(400).json({
        success: false,
        message: "contacts must be an array.",
      });
    }

    // Strip blanks, trim whitespace
    const cleaned = contacts
      .filter((c) => c.name && c.name.trim())
      .map((c) => ({
        name: c.name.trim(),
        relation: (c.relation || "").trim(),
        phone: (c.phone || "").trim(),
      }));

    const updated = await User.findByIdAndUpdate(
      req.userId,
      { emergencyContacts: cleaned },
      { new: true, runValidators: true },
    ).select("-password");

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Emergency contacts saved.",
      emergencyContacts: updated.emergencyContacts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again.",
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiry;
    await user.save();

    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
      },
    });

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "SafeYatra <onboarding@resend.dev>",
      to: user.email,
      subject: "Reset your SafeYatra password",
      html: `
    <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;background:#f8fafc;border-radius:12px">
      <h2 style="color:#0f172a">Reset your password</h2>
      <p style="color:#64748b">Click the button below to reset your password. This link expires in <strong>1 hour</strong>.</p>
      <a href="${resetURL}" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#3b82f6;color:#fff;border-radius:8px;text-decoration:none;font-weight:600">
        Reset Password
      </a>
      <p style="color:#94a3b8;font-size:12px;margin-top:24px">If you didn't request this, ignore this email.</p>
    </div>
  `,
    });

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again.",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset link.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully. You can now log in.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again.",
    });
  }
};
