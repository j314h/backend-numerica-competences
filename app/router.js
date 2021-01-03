const router = require("express").Router();

//import controllers
const authController = require("./controllers/auth.controller");
const userController = require("./controllers/user.controller");
const globalController = require("./controllers/global.controller");
const uploadController = require("./controllers/upload.controller");
const themesColorsController = require("./controllers/themesColors.controller");

//middleware verify
const {
  verifUserConnect,
  verifUserAccesAmin,
  verifUserAccesReferent,
  createUserHigtLevel,
  changeStateHigtLevelForUserHigtLevel,
  createUserHigtLevelRole,
  verifUserAccesRoot,
} = require("./middlewares/verifyAccess.conf");

//middleware multer
const { upload } = require("./middlewares/multer");

//roads for token api ROME + data for auth user
router.get("/access-token-api-rome", verifUserConnect, verifUserAccesReferent, authController.accessTokenApiRome);
router.get("/sign-out", verifUserConnect, authController.signOut);
router.post("/sign-in", authController.signIn);
router.post("/sign-up", verifUserConnect, verifUserAccesReferent, createUserHigtLevel, authController.signUp);

//roads for data this users
router.get("/user/:id", verifUserConnect, verifUserAccesReferent, userController.getUser);
router.patch(
  "/changestate-user",
  verifUserConnect,
  verifUserAccesAmin,
  changeStateHigtLevelForUserHigtLevel,
  userController.changeState
);
router.patch(
  "/changerole-user",
  verifUserConnect,
  verifUserAccesAmin,
  createUserHigtLevelRole,
  userController.changeRole
);
router.post("/update-user-root", verifUserConnect, userController.updateUserRootAdminRef);
router.delete("/user/:id", verifUserConnect, verifUserAccesAmin, userController.deleteUser);

//roads for globals data
router.get("/roles", verifUserConnect, verifUserAccesAmin, globalController.getAllRoles);
router.get("/states", verifUserConnect, verifUserAccesAmin, globalController.getAllStates);

//checkconnected
router.get("/auth/verification", verifUserConnect, authController.redirectConnect);

//upload files app (img)
router.post(
  "/file/logo-numerica",
  verifUserConnect,
  verifUserAccesRoot,
  upload.single("logoNumerica"),
  uploadController.uploadLogoNumerica
);
router.post(
  "/file/logo-identifiant",
  verifUserConnect,
  verifUserAccesRoot,
  upload.single("logoIdentifiant"),
  uploadController.uploadLogoIdentifiant
);
router.post(
  "/file/logo-menu",
  verifUserConnect,
  verifUserAccesRoot,
  upload.single("logoMenu"),
  uploadController.uploadLogoMenu
);
router.post(
  "/file/logo-numerica-footer",
  verifUserConnect,
  verifUserAccesRoot,
  upload.single("logoFooterNumerica"),
  uploadController.uploadLogoNumericaFooter
);
router.post(
  "/file/logo-update-element",
  verifUserConnect,
  verifUserAccesRoot,
  upload.single("logoUpdateElement"),
  uploadController.uploadlogoUpdateElement
);
router.post(
  "/file/logo-close-update-element",
  verifUserConnect,
  verifUserAccesRoot,
  upload.single("logoCloseUpdateElement"),
  uploadController.uploadlogoCloseUpdateElement
);

//get all image for app
router.get("/files-i", uploadController.allFilesImg);

//param app of color
router.get("/themes-colors", themesColorsController.getAllThemesColors); //no active
router.post("/cu-theme-color", verifUserConnect, themesColorsController.activateOrDesactivateDarkMode);

module.exports = router;
