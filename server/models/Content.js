const mongoose = require("mongoose");

const { Schema } = mongoose;

const ContentSchema = new Schema({
    contentTitle: {
        type: String,
        required: true
    },
    contentDescription: {
        type: String,
        required: true
    },
    lecture: {
        type: Schema.Types.ObjectId,
        ref: "Lecture",
        required: true
    },
    createdAt: Number,
    updatedAt: Number
}, { timestamps: true, versionKey: false });

const Content = mongoose.model("Content", ContentSchema);

module.exports = Content;