const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dp: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "student"],
        default: "student"
    },
    createdAt: Number,
    updatedAt: Number
}, { timestamps: true, versionKey: false });

const User = mongoose.model("User", UserSchema);

module.exports = User;