const { validationResult } = require("express-validator");
const Lecture = require("../../models/Lecture");

const updateLecture = async (req, res)=> {
    let success = false;
    try {
        const lectureId = req.params.id;

        const {title, description} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(`Error in add lecture route: ${errors.array()[0].msg}`);
            return res.status(422).json({ success, error: errors.array()[0].msg });
        }

        const lecture = await Lecture.findById(lectureId);
        if(!lecture) {
            return res.status(404).json({success, error: "Lecture not found"});
        }

        await Lecture.findByIdAndUpdate(lectureId, {
            title,
            description,
        }, {new: true});

        const lectures = await Lecture.find({course: lecture?.course?.toString()}).populate("course");

        success = true;
        return res.status(200).json({success, lectures});
    } catch (error) {
        return res.status(500).json({success, error: error.message});
    }
}

module.exports = updateLecture;