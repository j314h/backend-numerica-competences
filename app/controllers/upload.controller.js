const uploadController = {
  uploadLogoNumerica: (req, res, next) => {
    console.log("upload ok : ", req.file);
    res.end();
  },
};

module.exports = uploadController;
