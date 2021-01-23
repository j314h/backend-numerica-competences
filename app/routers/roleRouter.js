const roleRouter = require("express").Router();

//import controller
const roleController = require("../controllers/roleController");

//middleware verify
const { verifUserConnect, verifUserAccesAmin } = require("../middlewares/verifyAccess.conf");

//get roles
roleRouter.get("/roles", verifUserConnect, verifUserAccesAmin, roleController.getAllRoles);

module.exports = roleRouter;
