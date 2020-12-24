const multer = require("multer");
const { changeNameFileInFolder } = require("../queries/global.queries");
const fs = require("fs");

//type of file accepted
const extension = ["image/jpeg", "image/png", "image/svg+xml", "image/jpg"];

//filter for upload file, with array 'extension'
//if format file is not good return error
function fileFilter(req, file, cb) {
  if (!extension.includes(file.mimetype)) {
    return cb(new Error("Your file is not in the correct format"), false);
  }
  cb(null, true);
}

//config multer for upload files
exports.upload = multer({
  fileFilter,
  limits: { fileSize: 1000000 },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images");
    },
    filename: async function (req, file, cb) {
      try {
        //file is sup of 1Mo return error
        if (req.headers["content-length"] > 1000000) {
          return cb(new Error("Your file exceeds 1Mo"), false);
        }
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
        cb(new Error("An error occurred during recording"), false);
      }
    },
  }),
});
