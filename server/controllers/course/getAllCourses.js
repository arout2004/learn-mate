const Course = require("../../models/Course");

const getAllCourses = async (req, res) => {
  let success = false;
  try {
    let courses = await Course.find().populate("category");
    success = true;
    return res.status(200).json({ success, courses });
  } catch (error) {
    return res.status(500).json({ success, error: error.message });
  }
};

module.exports = getAllCourses;
