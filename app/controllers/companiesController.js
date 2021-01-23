const { Companies, Users, Sectors } = require("../models");

const companiesController = {
  //get all companies and sector of companies recover and référent user in companies
  getAllCompaniesAdmin: async (req, res, next) => {
    try {
      //for store referent of companies
      const tabReferent = [];

      //recover companies with id of current user
      const companies = await Companies.find({ admin: req.user._id });
      if (companies.name === "Error") throw new Error("Les companies n'ont pas pu etre récuperées");

      //add user role "référent" in array for send in front
      for (const company of companies) {
        const referent = await Users.find({ company: company._id });
        const newReferent = referent.find((el) => el.role.libelle === "référent" || el.role.libelle === "root");
        if (newReferent) {
          tabReferent.push(newReferent);
        }
      }

      //send list companies and array of user has role "référent"
      res.status(200).json({ companies, tabReferent });
    } catch (e) {
      req.errorMessage = "Error get all companies of admin connected";
      next(e);
    }
  },

  //get company return company selected
  getCompany: async (req, res, next) => {
    try {
      //recover company with id in url
      const company = await Companies.findById({ _id: req.params.id });
      res.status(200).json(company);
    } catch (e) {
      req.errorMessage = "Error get company";
      next(e);
    }
  },

  //create company and create sector if exist
  createCompany: async (req, res, next) => {
    try {
      //create company if error in create company
      const companyCreate = await Companies.create(req.body.company);
      if (companyCreate.name === "Error") throw new Error("erreur de creation de la companie");

      //loops for create sector for company if sector exist
      if (req.body.sectors.length > 0) {
        for (const sector of req.body.sectors) {
          await Sectors.create({ libelle: sector, company: companyCreate._id });
        }
      }
      res.status(200).end();
    } catch (e) {
      req.errorMessage = "Error create company";
      next(e);
    }
  },

  //update company return comapny update
  updateCompany: async (req, res, next) => {
    try {
      //update company with id
      const company = await Companies.findByIdAndUpdate(req.body._id, req.body.data, {
        useFindAndModify: false,
        new: true,
      });
      res.status(200).json(company);
    } catch (e) {
      req.errorMessage = "Error update company";
      next(e);
    }
  },

  //delete company with id in url
  deleteCompany: async (req, res, next) => {
    try {
      //recover companie selected for test
      const company = await Companies.findById(req.params.id);
      if (company.state.libelle !== "archivé")
        throw new Error("Impossible de supprimer cette entreprise: state is not archivé");

      //delete company if company is archived
      await Companies.findByIdAndDelete(req.params.id);
    } catch (e) {
      req.errorMessage = "Error delete company";
      next(e);
    }
  },
};

module.exports = companiesController;
