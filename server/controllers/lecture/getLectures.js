const Course = require("../../models/Course");
const Lecture = require("../../models/Lecture");

const getLectures = async (req, res)=> {
    let success = false;
    try {
        const courseId = req.params.id;

        const course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({success, error: "Course not found"});
        }

        const lectures = await Lecture.find({course: courseId}).populate("course");

        success = true;
        return res.status(200).json({success, lectures});
    } catch (error) {
        return res.status(500).json({success, error: error.message});
    }
}

module.exports = getLectures;