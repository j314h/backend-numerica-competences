const uploadRouter = require("express").Router();

//import controller
const uploadController = require("../controllers/uploadController");
//middleware multer
const { upload } = require("../middlewares/multer");

//middleware verify
const { verifUserConnect, verifUserAccesRoot } = require("../middlewares/verifyAccess.conf");

//get all image for app
uploadRouter.get("/files-i", uploadController.allFilesImg);
//upload files app (img)
uploadRouter.post(
  "/file/logo-numerica",
  verifUserConnect,
  verifUserAccesRoot,
  upload.single("logoNumerica"),
  uploadController.uploadLogoNumerica
);
uploadRouter.post(
  "/file/logo-identifiant",
  verifUserConnect,
  verifUserAccesRoot,
  upload.single("logoIdentifiant"),
  uploadController.uploadLogoIdentifiant
);
uploadRouter.post(
  "/file/logo-menu",
  verifUserConnect,
  verifUserAccesRoot,
  upload.single("logoMenu"),
  uploadController.uploadLogoMenu
);
uploadRouter.post(
  "/file/logo-numerica-footer",
  verifUserConnect,
  verifUserAccesRoot,
  upload.single("logoFooterNumerica"),
  uploadController.uploadLogoNumericaFooter
);
uploadRouter.post(
  "/file/logo-update-element",
  verifUserConnect,
  verifUserAccesRoot,
  upload.single("logoUpdateElement"),
  uploadController.uploadlogoUpdateElement
);
uploadRouter.post(
  "/file/logo-close-update-element",
  verifUserConnect,
  verifUserAccesRoot,
  upload.single("logoCloseUpdateElement"),
  uploadController.uploadlogoCloseUpdateElement
);

module.exports = uploadRouter;
