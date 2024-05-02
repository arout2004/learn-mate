const mongoose = require("mongoose");

const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: Number,
    updatedAt: Number
}, { timestamps: true, versionKey: false });

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;