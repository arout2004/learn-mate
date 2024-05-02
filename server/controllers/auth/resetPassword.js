const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const Token = require("../../models/Token");

const resetPassword = async (req, res)=> {
    let success = false;
    try {
        const {email, newPassword, confirmPassword, otp} = req.body;

        let user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({ success, error: "User not found" });
        }

        const userId = user?._id.toString();

        if(newPassword !== confirmPassword) {
            return res.status(401).json({success, error: "Password mismatch"});
        }

        let token = await Token.findOne({ email });
        if (!token) {
            return res.status(404).json({ success, error: "Invalid Token." });
        }

        if (token.otp !== parseInt(otp)) {
            return res.status(403).json({ success, error: "Incorrect otp." });
        }

        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(newPassword, salt);

        user = await User.findByIdAndUpdate(
            userId, 
            {password: securedPassword}, 
            {new: true}
        ).select("-password -createdAt -updatedAt");
        
        token = await Token.findOneAndDelete(token?._id?.toString(), { new: true });

        success = true;
        return res.status(200).json({success});
    } catch (error) {
        return res.status(500).json({success, error: error.message});
    }
}

module.exports = resetPassword;