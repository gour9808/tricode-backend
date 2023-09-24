const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: 0,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },

    familyMembers: { type: Array, default: [] },
  },
  { timestamps: true }
);

const user = mongoose.model("users", userSchema);

module.exports = user;
