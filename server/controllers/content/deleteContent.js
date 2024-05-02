const { validationResult } = require("express-validator");
const Content = require("../../models/Content");

const deleteContent = async (req, res)=> {
    let success = false;
    try {
        const contentId = req.params.id;

        let content = await Content.findById(contentId);
        if(!content) {
            return res.status(404).json({success, error: "Content not found"});
        }

        const lectureId = content?.lecture?.toString();

        await Content.findByIdAndDelete(contentId, {new: true});

        const contents = await Content.find({lecture: lectureId});

        success = true;
        return res.status(200).json({success, contents});
    } catch (error) {
        return res.status(500).json({success, error: error.message});
    }
}

module.exports = deleteContent;