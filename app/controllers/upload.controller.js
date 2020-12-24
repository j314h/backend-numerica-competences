const { Files } = require("../models");
const { changeOrCreateValueForFile } = require("../queries/global.queries");

const uploadController = {
  //get all files img
  allFilesImg: async (req, res, next) => {
    try {
      const files = await Files.find();
      console.log("Files send ok");
      res.status(200).json(files);
    } catch (e) {
      req.errorMessage = "An error occurred, unable to retrieve images";
      next(e);
    }
  },

  //upload img logo numerica
  uploadLogoNumerica: async (req, res, next) => {
    try {
      //update or create file
      const fileUpdate = await changeOrCreateValueForFile(req);
      console.log("Create or update logo numerica is ok");
      res.status(200).json(fileUpdate);
    } catch (e) {
      req.errorMessage = "Update or create field image error";
      next(e);
    }
  },

  //upload img logo identifiant
  uploadLogoIdentifiant: async (req, res, next) => {
    try {
      //update or create file
      const fileUpdate = await changeOrCreateValueForFile(req);
      console.log("Create or update logo identifiant is ok");
      res.status(200).json(fileUpdate);
    } catch (e) {
      req.errorMessage = "Update or create field image error";
      next(e);
    }
  },

  //upload img logo menu
  uploadLogoMenu: async (req, res, next) => {
    try {
      //update or create file
      const fileUpdate = await changeOrCreateValueForFile(req);
      console.log("Create or update logo menu is ok");
      res.status(200).json(fileUpdate);
    } catch (e) {
      req.errorMessage = "Update or create field image error";
      next(e);
    }
  },
};

module.exports = uploadController;
