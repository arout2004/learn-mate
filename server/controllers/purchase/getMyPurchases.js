const Purchase = require("../../models/Purchase");

const getMyPurchases = async (req, res) => {
    let success = false;
    try {
        const userId = req.user.id;

        const purchases = await Purchase.find({ user: userId })
            .populate({
                path: "course",
                populate: {
                    path: "category",
                    model: "Category",
                },
            });

        success = true;
        return res.status(200).json({ success, purchases });
    } catch (error) {
        return res.status(500).json({ success, error: error.message });
    }
}

module.exports = getMyPurchases;
