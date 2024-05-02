const Course = require("../../models/Course");
const Purchase = require("../../models/Purchase");

const addPurchase = async (req, res) => {
  let success = false;
  try {
    const userId = req.user.id;
    const courseId = req.params.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success, error: "Course not found" });
    }

    await Purchase.create({
      user: userId,
      course: courseId,
    });

    const purchases = await Purchase.find({ user: userId }).populate({
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
};

module.exports = addPurchase;
