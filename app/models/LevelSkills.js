const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const levelSkillSchema = Schema(
  {
    name: String,
    level: Number,
    color: String,
  },
  {
    timestamps: true,
  }
);

const LevelSkills = mongoose.model("level_skills", levelSkillSchema);

module.exports = LevelSkills;
