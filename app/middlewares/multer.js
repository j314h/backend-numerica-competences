const path = require("path");
const multer = require("multer");
const fileType = require("file-type");

const extension = ["image/jpeg", "image/png", "image/svg", "image/jpg"];

function fileFilter(req, file, cb) {
  console.log(file);
  if (!extension.includes(file.minetype)) {
    return cb(null, false);
  } else {
    cb(null, true);
  }
}

exports.upload = multer({
  //fileFilter,
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
  limits: { fileSize: 100000 },
});
