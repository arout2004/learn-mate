const Category = require("../../models/Category");

const getAllCategories = async (req, res)=> {
    let success = false;
    try {
        const categories = await Category.find();

        success = true;
        return res.status(200).json({success, categories});
    } catch (error) {
        return res.status(500).json({success, error: error.message});
    }
}

module.exports = getAllCategories;