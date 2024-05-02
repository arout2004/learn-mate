const { validationResult } = require("express-validator");
const Category = require("../../models/Category");

const addCategory = async (req, res)=> {
    let success = false;
    try {
        const {name} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(`Error in add category route: ${errors.array()[0].msg}`);
            return res.status(422).json({ success, error: errors.array()[0].msg });
        }

        await Category.create({
            name
        });

        const categories = await Category.find();

        success = true;
        return res.status(201).json({success, categories});
    } catch (error) {
        return res.status(500).json({success, error: error.message});
    }
}

module.exports = addCategory;