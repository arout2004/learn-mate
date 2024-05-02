const mongoose = require("mongoose");

const { Schema } = mongoose;

const TokenSchema = new Schema(
    {
      email: {
        type: String,
        required: true,
      },
      otp: {
        type: Number,
        required: true,
      },
      expiry: {
        type: Number,
      },
      createdAt: { type: Date, expires: "5m", default: Date.now },
    },
    { timestamps: true, versionKey: false }
  );
  
  const Token = mongoose.model("Token", TokenSchema);

  module.exports = Token;