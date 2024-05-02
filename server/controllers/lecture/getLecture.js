const Lecture = require("../../models/Lecture");

const getLecture = async (req, res)=> {
    let success = false;
    try {
        const lectureId = req.params.id;

        const lecture = await Lecture.findById(lectureId).populate("course");
        if(!lecture) {
            return res.status(404).json({success, error: "Lecture not found"});
        }

        success = true;
        return res.status(200).json({success, lecture});
    } catch (error) {
        return res.status(500).json({success, error: error.message});
    }
}

module.exports = getLecture;