const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sectorSchema = Schema(
  {
    libelle: String,
    company: { type: Schema.Types.ObjectId, ref: 'companies', autopopulate: true },
  },
  {
    timestamps: true,
  }
);

sectorSchema.plugin(require('mongoose-autopopulate'));

const Sectors = mongoose.model('sectors', sectorSchema);

module.exports = Sectors;
