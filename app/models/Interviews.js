const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interviewSchema = Schema(
  {
    comment: String,
    leader: { type: Schema.Types.ObjectId, ref: 'users', autopopulate: true },
    trade: { type: Schema.Types.ObjectId, ref: 'trades', autopopulate: true },
    state: { type: Schema.Types.ObjectId, ref: 'states', autopopulate: true },
    company: { type: Schema.Types.ObjectId, ref: 'companies', autopopulate: true },
    affectedUser: { type: Schema.Types.ObjectId, ref: 'users', autopopulate: true },
  },
  {
    timestamps: true,
  }
);

interviewSchema.plugin(require('mongoose-autopopulate'));

const Interviews = mongoose.model('interviews', interviewSchema);

module.exports = Interviews;
