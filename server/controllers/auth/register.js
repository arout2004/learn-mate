const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const Token = require("../../models/Token");
const User = require("../../models/User");

const register = async (req, res) => {
  let success = false;
  try {
    const { name, email, password, otp } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(`Error in student register route: ${errors.array()[0].msg}`);
      return res.status(422).json({ success, error: errors.array()[0].msg });
    }

    const token = await Token.findOne({ email });
    if (!token) {
      return res.status(404).json({ success, error: "Invalid Token." });
    }

    if (token.otp !== parseInt(otp)) {
      return res.status(403).json({ success, error: "Incorrect otp." });
    }

    let user = await User.findOne({email});
    if (user) {
      return res.status(409).json({ success, error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student",
    });

    await Token.findOneAndDelete(token?._id?.toString(), { new: true });

    success = true;
    return res.status(200).json({ success });

  } catch (error) {
    return res.status(500).json({ success, error: error.message });
  }
};

module.exports = register;