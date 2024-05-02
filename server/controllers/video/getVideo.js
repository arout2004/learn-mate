const Video = require("../../models/Video");

const getVideo = async (req, res)=> {
    let success = false;
    try {
        const videoId = req.params.id;

        const video = await Video.findById(videoId).select("-videoDescription -youtubeLink");
        if(!video) {
            return res.status(404).json({success, error: "Video not found"});
        }

        success = true;
        return res.status(200).json({success, video});
    } catch (error) {
        return res.status(500).json({success, error: error.message});
    }
}

module.exports = getVideo;