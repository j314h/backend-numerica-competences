const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = Schema(
  {
    libelle: String,
  },
  {
    timestamps: true,
  }
);

const States = mongoose.model('states', stateSchema);

module.exports = States;
