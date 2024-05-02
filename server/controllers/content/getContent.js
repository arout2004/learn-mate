const Content = require("../../models/Content");

const getContent = async (req, res)=> {
    let success = false;
    try {
        const contentId = req.params.id;

        const content = await Content.findById(contentId);
        if(!content) {
            return res.status(404).json({success, error: "Content not found"});
        }

        success = true;
        return res.status(200).json({success, content});
    } catch (error) {
        return res.status(500).json({success, error: error.message});
    }
}

module.exports = getContent;