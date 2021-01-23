const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = Schema(
  {
    name: String,
    filliale: String,
    siret: { type: String },
    naf: String,
    phoneNumber: String,
    address: { type: Object, street: String, postCode: String, city: { type: String }, required: true, unique: true },
    state: { type: Schema.Types.ObjectId, ref: "states", autopopulate: true },
    admin: { type: Schema.Types.ObjectId, ref: "users", required: true },
  },
  {
    timestamps: true,
  }
);

companySchema.plugin(require("mongoose-autopopulate"));

const Companies = mongoose.model("companies", companySchema);

module.exports = Companies;
