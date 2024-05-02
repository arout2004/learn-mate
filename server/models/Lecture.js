const mongoose = require("mongoose");

const { Schema } = mongoose;

const LectureSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    createdAt: Number,
    updatedAt: Number
}, { timestamps: true, versionKey: false });

const Lecture = mongoose.model("Lecture", LectureSchema);

module.exports = Lecture;