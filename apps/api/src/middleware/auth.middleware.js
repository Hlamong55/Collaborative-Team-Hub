const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};