const express = require("express");
const register = require("../controllers/auth/register");
const login = require("../controllers/auth/login");
const { body } = require("express-validator");
const fetchUser = require("../middlewares/fetchUser");
const grantAccess = require("../middlewares/grantAccess");
const resetPassword = require("../controllers/auth/resetPassword");
const getProfile = require("../controllers/auth/getProfile");
const updateProfile = require("../controllers/auth/updateProfile");
const changePassword = require("../controllers/auth/changePassword");

const router = express.Router();

router.post("/register", [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password")
        .isStrongPassword({ minLength: 8, minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1 }),
    body("otp", "Enter a valid OTP").isLength({ min: 4, max: 4 }).exists()
], register);

router.post("/login", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be empty").exists()
], login);

router.get("/profile", fetchUser, grantAccess("readOwn", "profile"), getProfile);

router.put("/profile", fetchUser, grantAccess("updateOwn", "profile"), updateProfile);

router.put("/change-password", fetchUser, changePassword);

router.put("/reset-password", resetPassword);

module.exports = router;