const tradeRouter = require("express").Router();

//import controllers
const tradeController = require("../controllers/tradeController");

//middleware verify
const { verifUserConnect, verifUserAccesReferent } = require("../middlewares/verifyAccess.conf");

//get trades of company selected
tradeRouter.get("/trades/:id", verifUserConnect, tradeController.getTradesOfCompany);

module.exports = tradeRouter;
