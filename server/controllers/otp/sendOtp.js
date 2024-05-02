const { validationResult } = require("express-validator");
const Token = require("../../models/Token");
const sendEmail = require("../../services/email");
const User = require("../../models/User");

const sendOtp = async (req, res) => {
  let success = false;
  try {
    const reason = req.query.reason;

    const { email } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success, error: errors.array()[0].msg });
    }

    const user = await User.findOne({email});
    if(reason === "signup") {
      if(user) {
        return res.status(403).json({success, error: "This email is associated to another account"});
      }
    }
    else if(reason === "forgotPassword") {
      if(!user) {
        return res.status(404).json({success, error: "User not found"});
      }
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    let token = await Token.findOne({ email });

    if (!token) {
      // Creating the token
      token = await Token.create({
        email,
        otp,
      });
    } else {
      token = await Token.findByIdAndUpdate(
        token._id.toString(),
        { otp },
        { new: true }
      );
    }

    // Sending OTP, to the user's email
    await sendEmail({
      subject: "OTP verification! This OTP is valid for 5 minutes only!",
      text: `OTP: ${token?.otp}`,
      email: email,
    });

    success = true;
    return res.status(200).json({ success });
  } catch (error) {
    return res.status(500).json({ success, error: error.message });
  }
};

module.exports = sendOtp;