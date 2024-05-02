const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

const secret = process.env.JWT_SECRET;

const login = async (req, res) => {
  let success = false;
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(`Error in login route: ${errors.array()[0].msg}`);
      return res.status(422).json({ success, error: errors.array()[0].msg });
    }

    let user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({ success, error: "User not found" });
    }

    const passwordCompare = await bcrypt.compare(password,user?.password);

    if(!passwordCompare) {
      return res.status(401).json({success, error: "Invalid credentials"});
    }

    user = await User.findById(user._id.toString()).select("-password -createdAt -updatedAt");

    const data = {
      user: {
        id: user.id,
        role: user.role
      },
    };

    const jwtToken = jwt.sign(data, secret);

    success = true;
    return res.status(200).json({ success, token: `Bearer ${jwtToken}`, user});

  } catch (error) {
    return res.status(500).json({ success, error: error.message });
  }
}

module.exports = login;