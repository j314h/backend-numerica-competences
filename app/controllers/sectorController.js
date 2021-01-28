const { Sectors } = require("../models");

const sectorController = {
  //get sectors of company selected
  getSectorsCompanySelected: async (req, res, next) => {
    try {
      const sectors = await Sectors.find({ company: { _id: req.params.id } });
      res.status(200).json(sectors);
    } catch (e) {
      req.errorMessage = "Error get sectors company";
      next(e);
    }
  },

  //create sectors
  createSectors: async (req, res, next) => {
    try {
      for (const sector of req.body.newSectors) {
        await Sectors.create({ libelle: sector, company: req.body._id });
      }
      const sectors = await Sectors.find({ company: req.body._id });
      res.status(200).json(sectors);
    } catch (e) {
      req.errorMessage = "Error create sectors company";
      next(e);
    }
  },

  //update sectors
  updateSectors: async (req, res, next) => {
    try {
      for (const sector of req.body.sectors) {
        await Sectors.findByIdAndUpdate(sector._id, sector);
      }
      const sectors = await Sectors.find({ company: req.body._id });
      res.status(200).json(sectors);
    } catch (e) {
      req.errorMessage = "Error create sectors company";
      next(e);
    }
  },
};

module.exports = sectorController;
