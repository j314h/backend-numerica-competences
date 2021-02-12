const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tradeSchema = Schema(
  {
    libelle: String,
    famille: String,
    company: { type: Schema.Types.ObjectId, ref: "companies", autopopulate: true },
  },
  {
    timestamps: true,
  }
);

tradeSchema.plugin(require("mongoose-autopopulate"));

const Trades = mongoose.model("trades", tradeSchema);

module.exports = Trades;
