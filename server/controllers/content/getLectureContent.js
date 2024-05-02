const Content = require("../../models/Content");
const Lecture = require("../../models/Lecture");
const Purchase = require("../../models/Purchase");

const getLectureContent = async (req, res)=> {
    let success = false;
    try {
        const userId = req.user.id;
        const role = req.user.role;
        const lectureId = req.params.id;

        const lecture = await Lecture.findById(lectureId);
        if(!lecture) {
            return res.status(404).json({success, error: "Lecture not found"});
        }

        if(role === "student") {
            const isPurchased = await Purchase.find({user: userId, course: lecture?.course?.toString()});
            if(!isPurchased) {
                return res.status(401).json({success, error: "You have not purchased this course"});
            }
        }

        const contents = await Content.find({lecture: lectureId});

        success = true;
        return res.status(200).json({success, contents});
    } catch (error) {
        return res.status(500).json({success, error: error.message});
    }
}

module.exports = getLectureContent;