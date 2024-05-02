const { validationResult } = require("express-validator");
const Course = require("../../models/Course");
const Category = require("../../models/Category");

const addCourse = async (req, res)=> {
    let success = false;
    try {
        const categoryId = req.params.id;

        const {name, description, mrp, salePrice, thumbnail} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(`Error in add course route: ${errors.array()[0].msg}`);
            return res.status(422).json({ success, error: errors.array()[0].msg });
        }

        const category = await Category.findById(categoryId);
        if(!category) {
            return res.status(404).json({success, error: "Category not found"});
        }

        await Course.create({
            name,
            description,
            category: categoryId,
            mrp,
            salePrice,
            thumbnail
        });

        const courses = await Course.find().populate("category");

        success = true;
        return res.status(201).json({success, courses});
    } catch (error) {
        return res.status(500).json({success, error: error.message});
    }
}

module.exports = addCourse;