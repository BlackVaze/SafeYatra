import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import twilio from "twilio";
import  connectDB  from "./db/connectDB.js";
import authRoutes from "./routes/auth1.route.js";
import reportRoutes from './routes/reportRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

console.log("SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("Token:", process.env.TWILIO_AUTH_TOKEN);
console.log("Phone:", process.env.TWILIO_PHONE_NUMBER);


// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/reports', reportRoutes);


// // Twilio SMS route
app.post("/api/send-message", (req, res) => {
  const { to } = req.body;

  if (!to) {
    return res.status(400).send({ success: false, error: "Phone number is required." });
  }

  client.messages
    .create({
      body: "I am in trouble. SEND HELP!",
      from: phoneNumber,
      to: to,
    })
    .then(message => res.send({ success: true, messageSid: message.sid }))
    .catch(err => res.status(500).send({ success: false, error: err.message }));
});

// Production setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Server start
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port: ${PORT}`);
});

export default app;