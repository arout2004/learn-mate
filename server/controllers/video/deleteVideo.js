const { validationResult } = require("express-validator");
const Video = require("../../models/Video");

const deleteVideo = async (req, res)=> {
    let success = false;
    try {
        const videoId = req.params.id;

        let video = await Video.findById(videoId);
        if(!video) {
            return res.status(404).json({success, error: "Video not found"});
        }

        const lectureId = video?.lecture?.toString();

        await Video.findByIdAndDelete(videoId, {new: true});

        const videos = await Video.find({lecture: lectureId});

        success = true;
        return res.status(200).json({success, videos});
    } catch (error) {
        return res.status(500).json({success, error: error.message});
    }
}

module.exports = deleteVideo;