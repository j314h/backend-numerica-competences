const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = Schema(
  {
    name: String,
    filliale: String,
    siret: String,
    naf: String,
    phoneNumber: String,
    address: {
      street: String,
      postCode: String,
      city: String,
    },
    state: { type: Schema.Types.ObjectId, ref: "states", autopopulate: true },
    admin: { type: Schema.Types.ObjectId, ref: "users", autopopulate: true },
  },
  {
    timestamps: true,
  }
);

companySchema.plugin(require("mongoose-autopopulate"));

const Companies = mongoose.model("companies", companySchema);

module.exports = Companies;
