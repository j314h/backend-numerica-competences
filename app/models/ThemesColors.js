const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//mode dark or normal
const themesColorsSchema = Schema(
  {
    name: String,
    colorText: String,
    colorMenuInactive: String,
    colorMenuActive: String,
    bgLayout: String,
    btn: String,
    colorTextTab: String,
    bgLigne: String,
    btnm: String,
    bgContent: String,
    darkMode: Boolean,
    colorTextImportant: String,
  },
  {
    timestamps: true,
  }
);

const ThemesColors = mongoose.model("themes_colors", themesColorsSchema);

module.exports = ThemesColors;
