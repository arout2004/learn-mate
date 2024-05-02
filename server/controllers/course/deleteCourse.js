const Course = require("../../models/Course");
const Lecture = require("../../models/Lecture");
const Content = require("../../models/Content");
const Video = require("../../models/Video");

const deleteCourse = async (req, res)=> {
    let success = false;
    try {
        const courseId = req.params.id;

        const course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({success, error: "Course not found"});
        }

        const lectures = await Lecture.find({course: courseId});

        const lectureIds = lectures.map((obj)=> obj._id.toString());

        await Content.deleteMany({lecture: {$in: lectureIds}});
        
        await Video.deleteMany({lecture: {$in: lectureIds}});

        await Lecture.deleteMany({course: courseId});

        await Course.findByIdAndDelete(courseId, {new: true});

        const courses = await Course.find().populate("category");

        success = true;
        return res.status(200).json({success, courses});
    } catch (error) {
        return res.status(500).json({success, error: error.message});
    }
}

module.exports = deleteCourse;