const { validationResult } = require("express-validator");
const Video = require("../../models/Video");

const updateVideo = async (req, res) => {
  let success = false;
  try {
    const videoId = req.params.id;

    const { videoTitle, videoDescription, videoUrl } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(`Error in update video route: ${errors.array()[0].msg}`);
      return res.status(422).json({ success, error: errors.array()[0].msg });
    }

    let video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ success, error: "Video not found" });
    }

    video = await Video.findByIdAndUpdate(
      videoId,
      {
        videoTitle,
        videoDescription,
        videoUrl,
      },
      { new: true }
    );

    const videos = await Video.find({
      lecture: video?.lecture?.toString(),
    });

    success = true;
    return res.status(200).json({ success, videos });
  } catch (error) {
    return res.status(500).json({ success, error: error.message });
  }
};

module.exports = updateVideo;
