const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = Schema(
  {
    name: String,
    site: String,
    siret: String,
    naf: String,
    address: {
      numberStreet: String,
      street: String,
      postCode: String,
      city: String,
    },
    state: { type: Schema.Types.ObjectId, ref: 'states', autopopulate: true },
  },
  {
    timestamps: true,
  }
);

companySchema.plugin(require('mongoose-autopopulate'));

const Companies = mongoose.model('companies', companySchema);

module.exports = Companies;
