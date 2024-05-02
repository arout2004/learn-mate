const { validationResult } = require("express-validator");
const Course = require("../../models/Course");

const updateCourse = async (req, res)=> {
    let success = false;
    try {
        const courseId = req.params.id;

        const {name, description, mrp, salePrice, thumbnail} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(`Error in update course route: ${errors.array()[0].msg}`);
            return res.status(422).json({ success, error: errors.array()[0].msg });
        }

        const course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({success, error: "Course not found"});
        }

        await Course.findByIdAndUpdate(courseId, {
            name,
            description,
            mrp,
            salePrice,
            thumbnail
        }, {new: true});

        const courses = await Course.find().populate("category");

        success = true;
        return res.status(200).json({success, courses});
    } catch (error) {
        return res.status(500).json({success, error: error.message});
    }
}

module.exports = updateCourse;