const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const businessRequiredSkillSchema = Schema(
  {
    libelle: String,
    description: String,
    type: String,
    ponderation: Number,
    level: { type: Schema.Types.ObjectId, ref: "level_skills", autopopulate: true },
    trade: { type: Schema.Types.ObjectId, ref: "trades", autopopulate: true },
  },
  {
    timestamps: true,
  }
);

businessRequiredSkillSchema.plugin(require("mongoose-autopopulate"));

const BusinessRequiredSkills = mongoose.model("business_required_skills", businessRequiredSkillSchema);

module.exports = BusinessRequiredSkills;
