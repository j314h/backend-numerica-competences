const { ThemesColors } = require("../models");

//function for create ou update document theme color in database
exports.createOrUpdateThemeColor = async (req) => {
  try {
    const themeColor = await ThemesColors.findOneAndUpdate(
      { name: req.user.email },
      {
        name: req.user.email,
        bgMenuHeadband: req.body.bgMenuHeadband,
        bgDarkContent: req.body.bgDarkContent,
        bgHeadArray: req.body.bgHeadArray,
        colorTextPrimary: req.body.colorTextPrimary,
        colorTextHeadArray: req.body.colorTextHeadArray,
        colorTextInactive: req.body.colorTextInactive,
        colorTextActive: req.body.colorTextActive,
        colorBtnPrimary: req.body.colorBtnPrimary,
        colorBtnSecondary: req.body.colorBtnSecondary,
        colorLignArray: req.body.colorLignArray,
      },
      { useFindAndModify: false, new: true, upsert: true }
    );
    if (!themeColor) throw new Error("Unable to update this colors, an error has occurred");
    return themeColor;
  } catch (e) {
    return e;
  }
};
