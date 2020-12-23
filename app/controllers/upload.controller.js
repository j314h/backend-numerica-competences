const { changeOrCreateValueForFile } = require("../queries/global.queries");

const uploadController = {
  //upload img logo numerica
  uploadLogoNumerica: async (req, res, next) => {
    try {
      //update or create file
      const fileUpdate = await changeOrCreateValueForFile(req);
      res.status(200).json(fileUpdate);
    } catch (e) {
      req.errorMessage = "Update or create field image error";
      next(e);
    }
  },
};

module.exports = uploadController;
