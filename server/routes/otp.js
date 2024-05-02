const express = require("express");
const sendOtp = require("../controllers/otp/sendOtp");
const { body } = require("express-validator");

const router = express.Router();

router.post("/send", [
    body("email", "Enter a valid email").isEmail()
], sendOtp);

module.exports = router;