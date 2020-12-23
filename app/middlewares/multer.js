const multer = require("multer");
const { changeNameFileInFolder } = require("../queries/global.queries");
const fs = require("fs");

//type of file accepted
const extension = ["image/jpeg", "image/png", "image/svg+xml", "image/jpg"];

//filter for upload file, with array 'extension'
function fileFilter(req, file, cb) {
  if (extension.includes(file.mimetype)) {
    return cb(null, true);
  } else {
    cb(null, false);
  }
}

//config multer for upload files
exports.upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images");
    },
    filename: async function (req, file, cb) {
      try {
        //test if file exist and supprime file for save new file
        const fileCurrent = await changeNameFileInFolder(file);
        if (fileCurrent) {
          const existFile = fs.existsSync(`${fileCurrent.src}`);
          if (existFile) {
            fs.unlinkSync(`${fileCurrent.src}`);
          }
        }
        //recover type file
        const tab = file.mimetype.split("/");
        //custom name file save
        //if we save an svg we must remove the + xml
        //else save is good
        if (tab[1] === "svg+xml") {
          const newTab = tab[1].split("+");
          cb(null, `${file.fieldname}-${Date.now()}.${newTab[0]}`);
        } else {
          cb(null, `${file.fieldname}-${Date.now()}.${tab[1]}`);
        }
      } catch (error) {
        cb(null, false);
      }
    },
  }),
  fileFilter,
  limits: { fileSize: 100000 },
});
