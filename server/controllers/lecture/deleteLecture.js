const Content = require("../../models/Content");
const Lecture = require("../../models/Lecture");
const Video = require("../../models/Video");

const deleteLecture = async (req, res)=> {
    let success = false;
    try {
        const lectureId = req.params.id;

        const lecture = await Lecture.findById(lectureId);
        if(!lecture) {
            return res.status(404).json({success, error: "Lecture not found"});
        }
        
        const courseId = lecture?.course?.toString();

        await Content.deleteMany({lecture: lectureId});

        await Video.deleteMany({lecture: lectureId});

        await Lecture.findByIdAndDelete(lectureId, {new: true});

        const lectures = await Lecture.find({course: courseId}).populate("course");

        success = true;
        return res.status(200).json({success, lectures});
    } catch (error) {
        return res.status(500).json({success, error: error.message});
    }
}

module.exports = deleteLecture;