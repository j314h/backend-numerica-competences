const companiesRouter = require("express").Router();

//import controller
const companiesController = require("../controllers/companiesController");

//middleware verify
const { verifUserConnect, verifUserAccesAmin, verifUserAccesReferent } = require("../middlewares/verifyAccess.conf");

//get all companies for admin user
companiesRouter.get("/companies-admin", verifUserConnect, verifUserAccesAmin, companiesController.getAllCompaniesAdmin);
//get company with id
companiesRouter.get("/company/:id", verifUserConnect, verifUserAccesAmin, companiesController.getCompany);
//create company
companiesRouter.post("/company-create", verifUserConnect, verifUserAccesAmin, companiesController.createCompany);
//update company
companiesRouter.post("/company-update", verifUserConnect, verifUserAccesReferent, companiesController.updateCompany);
//delete company
companiesRouter.delete("company/:id", verifUserConnect, verifUserAccesAmin, companiesController.deleteCompany);

module.exports = companiesRouter;
