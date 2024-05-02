const Course = require("../../models/Course");

const getCourses = async (req, res)=> {
    let success = false;
    try {
        const categoryId = req.params.id;

        let courses = await Course.find().populate("category");

        if(categoryId) {
            courses = await Course.find({category: categoryId});
        }

        success = true;
        return res.status(200).json({success, courses});
    } catch (error) {
        return res.status(500).json({success, error: error.message});
    }
}

module.exports = getCourses;