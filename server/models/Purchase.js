const mongoose = require("mongoose");

const { Schema } = mongoose;

const PurchaseSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: Number,
    updatedAt: Number
}, { timestamps: true, versionKey: false });

const Purchase = mongoose.model("Purchase", PurchaseSchema);

module.exports = Purchase;