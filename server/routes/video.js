const express = require("express");
const fetchUser = require("../middlewares/fetchUser");
const grantAccess = require("../middlewares/grantAccess");
const { param, body } = require("express-validator");
const getLectureVideos = require("../controllers/video/getLectureVideos");
const getVideo = require("../controllers/video/getVideo");
const addVideo = require("../controllers/video/addVideo");
const updateVideo = require("../controllers/video/updateVideo");
const deleteVideo = require("../controllers/video/deleteVideo");
const Video = require("../models/Video");

const router = express.Router();

router.get("/", fetchUser, grantAccess("readAny", "content"), async (req, res)=> {
  let success = false;
  try {
    const videos = await Video.find();

    success = true;
    return res.status(200).json({success, videos});
  } catch (error) {
    return res.status(500).json({success, error: error.message});
  }
});

router.get(
  "/:id",
  [param("id", "Invalid lecture ID").isLength({ min: 24, max: 24 })],
  fetchUser,
  grantAccess("readOwn", "content"),
  getLectureVideos
);

router.get(
  "/get/:id",
  [param("id", "Invalid content ID").isLength({ min: 24, max: 24 })],
  fetchUser,
  grantAccess("readAny", "content"),
  getVideo
);

router.post(
  "/:id",
  [
    param("id", "Invalid lecture ID").isLength({ min: 24, max: 24 }),
    body("videoTitle", "Video title cannot be empty").exists(),
    body("videoDescription", "Video description cannot be empty").exists(),
    body("videoUrl", "Video Url cannot be empty").exists(),
  ],
  fetchUser,
  grantAccess("createAny", "content"),
  addVideo
);

router.put(
  "/:id",
  [
    param("id", "Invalid video ID").isLength({ min: 24, max: 24 }),
    body("videoTitle", "Video title cannot be empty").exists(),
    body("videoDescription", "Video description cannot be empty").exists(),
    body("videoUrl", "Video Url cannot be empty").exists(),
  ],
  fetchUser,
  grantAccess("updateAny", "content"),
  updateVideo
);

router.delete(
  "/:id",
  [param("id", "Invalid video ID").isLength({ min: 24, max: 24 })],
  fetchUser,
  grantAccess("deleteAny", "content"),
  deleteVideo
);

module.exports = router;
