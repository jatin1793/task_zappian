const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: [true, "Please enter your name"],
    },

    userEmail: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please enter your password"],
      // select: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserData", User);
