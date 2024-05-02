const { validationResult } = require("express-validator");
const Content = require("../../models/Content");
const Lecture = require("../../models/Lecture");

const addContent = async (req, res) => {
  let success = false;
  try {
    const lectureId = req.params.id;

    const {
      contentTitle,
      contentDescription
    } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(`Error in add content route: ${errors.array()[0].msg}`);
      return res.status(422).json({ success, error: errors.array()[0].msg });
    }

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ success, error: "Lecture not found" });
    }

    await Content.create({
      contentTitle,
      contentDescription,
      lecture: lectureId,
    });

    const contents = await Content.find({ lecture: lectureId });

    success = true;
    return res.status(201).json({ success, contents });
  } catch (error) {
    return res.status(500).json({ success, error: error.message });
  }
};

module.exports = addContent;
