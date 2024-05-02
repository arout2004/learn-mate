const { validationResult } = require("express-validator");
const Lecture = require("../../models/Lecture");
const Video = require("../../models/Video");

const addVideo = async (req, res) => {
  let success = false;
  try {
    const lectureId = req.params.id;

    const { videoTitle, videoDescription, videoUrl } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(`Error in add video route: ${errors.array()[0].msg}`);
      return res.status(422).json({ success, error: errors.array()[0].msg });
    }

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ success, error: "Lecture not found" });
    }

    await Video.create({
      videoTitle,
      videoDescription,
      videoUrl,
      lecture: lectureId,
    });

    const videos = await Video.find({ lecture: lectureId });

    success = true;
    return res.status(201).json({ success, videos });
  } catch (error) {
    return res.status(500).json({ success, error: error.message });
  }
};

module.exports = addVideo;
