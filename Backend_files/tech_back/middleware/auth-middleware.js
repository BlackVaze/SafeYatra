import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided. Please login to continue",
    });
  }

  try {
    const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedTokenInfo);

    req.userId = decodedTokenInfo.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token. Please login again.",
    });
  }
};

export default authMiddleware;