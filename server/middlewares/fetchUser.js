const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secret = process.env.JWT_SECRET;

const fetchUser = async (req, res, next) => {
  let success;
  const token = req.headers.authorization;
  if (!token) {
    success = false;
    return res.status(401).json({
      success,
      error: "Please authenticate using a valid token."
    });
  }
  try {
    const userToken = token.substring(7, token.length);
    const data = jwt.verify(userToken, secret);

    // Checking if a user exists with the id received from the jwt
    const user = await User.findById(data.user.id);
    if (!user) {
      success = false;
      return res.status(404).json({ success, error: "User does not exist." });
    }

    req.user = data.user;
    next();
  } catch (error) {
    success = false;
    return res.json({ success, error: error.message, status: 401 });
  }
};

module.exports = fetchUser;