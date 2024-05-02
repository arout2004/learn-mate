const User = require("../../models/User");


const updateProfile = async (req, res) => {
    let success = false;
    try {
        const userId = req.user.id;
        const {name,email,dp} = req.body;

        let user = await User.findById(userId);
        let image = dp;

        if (!image) {
            image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
        }

        user = await User.findByIdAndUpdate(userId, { name, email, dp: image }, { new: true });

        user = await User.findById(userId).select("-password -createdAt -updatedAt");

        success = true;
        return res.status(200).json({ success, user });
    } catch (error) {
        return res.status(500).json({ success, error: error.message });
    }
}

module.exports = updateProfile;