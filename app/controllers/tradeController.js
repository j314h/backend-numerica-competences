const { Trades } = require("../models");

const tradeController = {
  //get trades of company selected
  getTradesOfCompany: async (req, res, next) => {
    try {
      const trades = await Trades.find({ company: { _id: req.params.id } });
      res.status(200).json(trades);
    } catch (e) {
      req.errorMessage = "Error get states";
      next(e);
    }
  },
};

module.exports = tradeController;
