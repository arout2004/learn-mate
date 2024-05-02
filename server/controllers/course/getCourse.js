const Course = require("../../models/Course");

const getCourse = async (req, res)=> {
    let success = false;
    try {
        const courseId = req.params.id;

        let course = await Course.findById(courseId).populate("category");
        if(!course) {
            return res.status(404).json({success, error: "Course not found"});
        }

        success = true;
        return res.status(200).json({success, course});
    } catch (error) {
        return res.status(500).json({success, error: error.message});
    }
}

module.exports = getCourse;