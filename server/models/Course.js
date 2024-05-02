const mongoose = require("mongoose");

const { Schema } = mongoose;

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    salePrice: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    createdAt: Number,
    updatedAt: Number
}, { timestamps: true, versionKey: false });

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;