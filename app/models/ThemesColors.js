const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  },
  {
    timestamps: true,
  }
);

const ThemesColors = mongoose.model("themes_colors", themesColorsSchema);

module.exports = ThemesColors;
