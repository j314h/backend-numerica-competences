const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logoIconSchema = Schema(
  {
    name: String,
    libelle: String,
    url: String,
  },
  {
    timestamps: true,
  }
);

const LogosIcons = mongoose.model("logos_icons", logoIconSchema);

module.exports = LogosIcons;
