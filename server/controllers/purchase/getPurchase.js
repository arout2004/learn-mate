const Purchase = require("../../models/Purchase");

const getPurchase = async (req, res) => {
  let success = false;
  try {
    const purchaseId = req.params.id;
    const purchase = await Purchase.findById(purchaseId)
      .populate("user")
      .populate({
        path: "course",
        populate: {
          path: "category",
          model: "Category",
        },
      });
    if (!purchase) {
      return res.status(404).json({ success, error: "Purchase not found" });
    }

    success = true;
    return res.status(200).json({ success, purchase });
  } catch (error) {
    return res.status(500).json({ success, error: error.message });
  }
};

module.exports = getPurchase;
