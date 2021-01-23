const themeColorRouter = require("express").Router();

//import controllers
const themesColorsController = require("../controllers/themesColorsController");
//middleware verify
const { verifUserConnect } = require("../middlewares/verifyAccess.conf");

//get all themeColor //no active
themeColorRouter.get("/themes-colors", themesColorsController.getAllThemesColors);
//update themeColor of current user
themeColorRouter.post("/cu-theme-color", verifUserConnect, themesColorsController.activateOrDesactivateDarkMode);

module.exports = themeColorRouter;
