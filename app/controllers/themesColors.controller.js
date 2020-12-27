const { Users, ThemesColors } = require("../models");

const themesColorsController = {
  //get all themes colors
  getAllThemesColors: (req, res, next) => {},

  //create or update theme color related to user login
  createOrUpdateThemeColor: async (req, res, next) => {
    try {
      //create or update this theme color
      const newThemeColor = await ThemesColors.findOne({ name: req.body.name });
      if (!newThemeColor) throw new Error("An error has occured during the update ");
      //update user for theme color key
      const user = await Users.findByIdAndUpdate(
        { _id: req.user._id },
        { themeColor: newThemeColor._id },
        { useFindAndModify: false, new: true, upsert: true }
      );
      if (!user) throw new Error("The user received an error during his color update");
      res.status(200).json(user);
    } catch (e) {
      req.errorMessage = "An error occurred while updating the colors";
      next(e);
    }
  },
};

module.exports = themesColorsController;
