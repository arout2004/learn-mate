const mongoose = require("mongoose");

const { Schema } = mongoose;

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: Number,
    updatedAt: Number
}, { timestamps: true, versionKey: false });

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;