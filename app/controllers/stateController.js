const { States } = require("../models");

const stateController = {
  //get all states
  getAllStates: async (req, res, next) => {
    try {
      const states = await States.find();
      res.status(200).json(states);
    } catch (e) {
      req.errorMessage = "Error get states";
      next(e);
    }
  },
};

module.exports = stateController;
