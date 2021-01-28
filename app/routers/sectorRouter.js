const sectorRouter = require("express").Router();

//import controller
const sectorController = require("../controllers/sectorController");

//middleware verify
const { verifUserConnect, verifUserAccesAmin } = require("../middlewares/verifyAccess.conf");

//sectors in company selected this id is id company
sectorRouter.get("/sectors/:id", verifUserConnect, /*verifUserAccesAmin,*/ sectorController.getSectorsCompanySelected);
//create sectors
sectorRouter.post("/sectors-create", verifUserConnect, /*verifUserAccesAmin,*/ sectorController.createSectors);
//update sectors
sectorRouter.post("/sectors-update", verifUserConnect, /*verifUserAccesAmin,*/ sectorController.updateSectors);

module.exports = sectorRouter;
