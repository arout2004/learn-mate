const Category = require("../../models/Category");

const getCategory = async (req, res)=> {
    let success = false;
    try {
        const categoryId = req.params.id;

        const category = await Category.findById(categoryId);
        if(!category) {
            return res.status(404).json({success, error: "Category not found"});
        }

        success = true;
        return res.status(200).json({success, category});
    } catch (error) {
        return res.status(500).json({success, error: error.message});
    }
}

module.exports = getCategory;