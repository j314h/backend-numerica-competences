const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const filesSchema = Schema(
  {
    name: String,
    fieldName: String,
    src: String,
  },
  {
    timestamps: true,
  }
);

const Files = mongoose.model("files", filesSchema);

module.exports = Files;
