const { validationResult } = require("express-validator");
const Course = require("../../models/Course");
const Lecture = require("../../models/Lecture");

const addLecture = async (req, res)=> {
    let success = false;
    try {
        const courseId = req.params.id;

        const {title, description} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(`Error in add lecture route: ${errors.array()[0].msg}`);
            return res.status(422).json({ success, error: errors.array()[0].msg });
        }

        const course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({success, error: "Course not found"});
        }

        await Lecture.create({
            title,
            description,
            course: courseId
        });

        const lectures = await Lecture.find({course: courseId}).populate("course");

        success = true;
        return res.status(201).json({success, lectures});
    } catch (error) {
        return res.status(500).json({success, error: error.message});
    }
}

module.exports = addLecture;