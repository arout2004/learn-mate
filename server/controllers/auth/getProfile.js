const User = require("../../models/User");

const getProfile = async (req, res)=> {
    let success = false;
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select("-password -createdAt -updatedAt");

        success = true;
        return res.status(200).json({success, user});
    } catch (error) {
        return res.status(500).json({success, error: error.message});
    }
}

module.exports = getProfile;