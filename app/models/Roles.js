const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = Schema(
  {
    libelle: String,
  },
  {
    timestamps: true,
  }
);

const Roles = mongoose.model('roles', roleSchema);

module.exports = Roles;
