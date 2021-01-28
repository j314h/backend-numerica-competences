const stateRouter = require("express").Router();

//import controller
const stateController = require("../controllers/stateController");

//middleware verify
const { verifUserConnect, verifUserAccesAmin } = require("../middlewares/verifyAccess.conf");

//get states
stateRouter.get("/states", verifUserConnect, /*verifUserAccesAmin,*/ stateController.getAllStates);

module.exports = stateRouter;
