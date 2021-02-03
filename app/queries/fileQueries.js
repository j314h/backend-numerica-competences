const { Files } = require("../models");

//in bdd modification
//change or create value for user, with request with user _id
exports.changeOrCreateValueForFile = async (req) => {
  try {
    const file = await Files.findOneAndUpdate(
      { name: req.file.fieldname },
      { name: req.file.fieldname, fieldName: req.file.filename, src: req.file.path },
      { useFindAndModify: false, new: true, upsert: true }
    );
    if (!file) throw new Error(`Impossible de modifier l'image`);
    return file;
  } catch (e) {
    return e;
  }
};

//in folder images modification
//check file exist and update name file in folder images
exports.changeNameFileInFolder = async (file) => {
  try {
    const fileNew = await Files.findOne({ name: file.fieldname });
    if (!fileNew) throw new Error("Impossible de trouver l'image");
    return fileNew;
  } catch (e) {
    return e;
  }
};
