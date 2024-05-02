const { validationResult } = require("express-validator");
const Category = require("../../models/Category");

const deleteCategory = async (req, res)=> {
    let success = false;
    try {
        const categoryId = req.params.id;

        let category = await Category.findById(categoryId);
        if(!category) {
            return res.status(404).json({success, error: "Category not found"});
        }

        await Category.findByIdAndDelete(categoryId, {new: true});

        const categories = await Category.find();

        success = true;
        return res.status(200).json({success, categories});
    } catch (error) {
        return res.status(500).json({success, error: error.message});
    }
}

module.exports = deleteCategory;