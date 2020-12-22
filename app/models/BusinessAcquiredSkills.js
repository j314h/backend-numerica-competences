const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessAcquiredSkillSchema = Schema(
  {
    libelle: String,
    ponderation: Number,
    level: { type: Schema.Types.ObjectId, ref: 'level_skills', autopopulate: true },
    trade: { type: Schema.Types.ObjectId, ref: 'trades', autopopulate: true },
  },
  {
    timestamps: true,
  }
);

businessAcquiredSkillSchema.plugin(require('mongoose-autopopulate'));

const BusinessAcquiredSkills = mongoose.model('business_acquired_skills', businessAcquiredSkillSchema);

module.exports = BusinessAcquiredSkills;
