const { Sectors } = require("../models");

const sectorController = {
  //get sectors of company selected
  getSectorsCompanySelected: async (req, res, next) => {
    try {
      const sectors = await Sectors.find({ company: { _id: req.params.id } });
      res.status(200).json(sectors);
    } catch (e) {
      req.errorMessage = "Error get company";
      next(e);
    }
  },
};

module.exports = sectorController;
