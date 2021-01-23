const sectorRouter = require("express").Router();

//import controller
const sectorController = require("../controllers/sectorController");

//middleware verify
const { verifUserConnect, verifUserAccesAmin } = require("../middlewares/verifyAccess.conf");

//sectors in company selected
sectorRouter.get("/sectors/:id", verifUserConnect, verifUserAccesAmin, sectorController.getSectorsCompanySelected);

module.exports = sectorRouter;
