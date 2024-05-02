const mongoose = require("mongoose");

const { Schema } = mongoose;

const VideoSchema = new Schema(
  {
    videoTitle: {
      type: String,
      required: true,
    },
    videoDescription: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    lecture: {
      type: Schema.Types.ObjectId,
      ref: "Lecture",
      required: true,
    },
    createdAt: Number,
    updatedAt: Number,
  },
  { timestamps: true, versionKey: false }
);

const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;
