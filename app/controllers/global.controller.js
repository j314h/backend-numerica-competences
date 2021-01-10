const { Roles, States, Companies, Sectors } = require("../models");

const globalController = {
  //get all states
  getAllStates: async (req, res, next) => {
    try {
      const states = await States.find();
      console.log("All roles send");
      res.status(200).json(states);
    } catch (e) {
      req.errorMessage = "Error get states";
      next(e);
    }
  },

  //get all roles
  getAllRoles: async (req, res, next) => {
    try {
      const roles = await Roles.find();
      console.log("All roles send");
      res.status(200).json(roles);
    } catch (e) {
      req.errorMessage = "Error get roles";
      next(e);
    }
  },

  //create company
  createCompany: async (req, res, next) => {
    try {
      //create company
      const companyCreate = await Companies.create(req.body.company);
      //if error in create company
      if (companyCreate.name === "Error") throw new Error("erreur de creation de la companie");
      //loops for create sector for company if sector exist
      if (req.body.sectors.length > 0) {
        for (const sector of req.body.sectors) {
          await Sectors.create({ libelle: sector, company: companyCreate._id });
        }
      }
      //termined process
      console.log("campanies and sector create OK");
      res.status(200).end();
    } catch (e) {
      req.errorMessage = "Error create company";
      next(e);
    }
  },
};

module.exports = globalController;
