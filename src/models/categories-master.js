const mongoose = require("mongoose");

const categoryMasterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

const categoryMaster = mongoose.model(
  "categories-master",
  categoryMasterSchema
);

module.exports = categoryMaster;
