const jwt = require("jsonwebtoken");

const generateAccessToken = (user) =>
  jwt.sign(
    {
      id: user.id,
      email: user.email,
    },

    process.env.JWT_ACCESS_SECRET,

    {
      expiresIn: "7d",
    }
  );

const generateRefreshToken = (user) =>
  jwt.sign(
    {
      id: user.id,
    },

    process.env.JWT_REFRESH_SECRET,

    {
      expiresIn: "30d",
    }
  );

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};