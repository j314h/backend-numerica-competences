const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const themesColorsSchema = Schema(
  {
    name: String,
    bgMenuHeadband: String, //bgm- blue, gray * ok class *
    bgDarkContent: String, // no change (it's name of class) * ok class
    bgHeadArray: String, // bgharray- blue, gray, lightblue, lightgray * ok class *
    colorTextPrimary: String, //ct-custom- primary, secondary * ok class * // no change user
    colorTextHeadArray: String, // ctextharray- blue, orange, white, gray
    colorTextInactive: String, //ctm- blue, orange, white, gray * ok class *
    colorTextActive: String, //ctm- blue, orange, white, gray * ok class *
    colorBtnPrimary: String, // cbtn- blue, orange, * ok class *
    colorBtnSecondary: String, // cbtnm- blue, orange, * ok class *
    colorLignArray: String, //clignearray- blue, orange
  },
  {
    timestamps: true,
  }
);

const ThemesColors = mongoose.model("themes_colors", themesColorsSchema);

module.exports = ThemesColors;
