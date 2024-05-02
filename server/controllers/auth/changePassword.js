const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const changePassword = async (req, res) => {
    let success = false;
    try {
        const userId = req.user.id;
        const { oldPassword, newPassword, confirmPassword } = req.body;

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success, error: "User not found" });
        }

        const passwordCheck = await bcrypt.compare(oldPassword, user?.password);
        if (!passwordCheck) {
            return res.status(401).json({ success, error: "Incorrect old password" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(401).json({ success, error: "Password mismatch" });
        }

        if (newPassword === oldPassword) {
            return res.status(401).json({ success, error: "New password cannot be same as old password" });
        }

        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(newPassword, salt);

        user = await User.findByIdAndUpdate(userId, { password: securedPassword }, { new: true }).select("-password -createdAt -updatedAt").exec();

        success = true;
        return res.status(200).json({ success });
    } catch (error) {
        return res.status(500).json({ success, error: error.message });
    }
}

module.exports = changePassword;