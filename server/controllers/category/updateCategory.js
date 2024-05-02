const { validationResult } = require("express-validator");
const Category = require("../../models/Category");

const updateCategory = async (req, res)=> {
    let success = false;
    try {
        const categoryId = req.params.id;
        const {name} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(`Error in update category route: ${errors.array()[0].msg}`);
            return res.status(422).json({ success, error: errors.array()[0].msg });
        }

        let category = await Category.findById(categoryId);
        if(!category) {
            return res.status(404).json({success, error: "Category not found"});
        }

        await Category.findByIdAndUpdate(categoryId, {
            name
        }, {new: true});

        const categories = await Category.find();

        success = true;
        return res.status(200).json({success, categories});
    } catch (error) {
        return res.status(500).json({success, error: error.message});
    }
}

module.exports = updateCategory;