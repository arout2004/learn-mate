const { validationResult } = require("express-validator");
const Content = require("../../models/Content");

const updateContent = async (req, res) => {
  let success = false;
  try {
    const contentId = req.params.id;

    const {
      contentTitle,
      contentDescription
    } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(`Error in update content route: ${errors.array()[0].msg}`);
      return res.status(422).json({ success, error: errors.array()[0].msg });
    }

    let content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ success, error: "Content not found" });
    }

    content = await Content.findByIdAndUpdate(
      contentId,
      {
        contentTitle,
        contentDescription
      },
      { new: true }
    );

    const contents = await Content.find({
      lecture: content?.lecture?.toString(),
    });

    success = true;
    return res.status(200).json({ success, contents });
  } catch (error) {
    return res.status(500).json({ success, error: error.message });
  }
};

module.exports = updateContent;
