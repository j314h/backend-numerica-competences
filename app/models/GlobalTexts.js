const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const globalTextSchema = Schema(
  {
    name: String,
    text: String,
    role: { type: Schema.Types.ObjectId, ref: 'roles', autopopulate: true },
    element: String,
  },
  {
    timestamps: true,
  }
);

globalTextSchema.plugin(require('mongoose-autopopulate'));

const GlobalTexts = mongoose.model('global_texts', globalTextSchema);

module.exports = GlobalTexts;
