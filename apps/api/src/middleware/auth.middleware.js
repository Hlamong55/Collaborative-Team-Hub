const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    // no token
    if (!token) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    // verify
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET
    );

    req.user = decoded;

    next();

  } catch (err) {

    // expired token
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Session expired. Please login again.",
      });
    }

    // invalid token
    if (err,name === "JsonWebTokenError") {
      return res.status(401).json({
      message: "Invalid token",
      });
    }

    console.error("Auth Middleware Error:", err);

    return res.status(500).json({
    message: "Authentication Failed", 
    });
  }
};