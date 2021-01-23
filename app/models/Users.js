const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    civility: String,
    name: {
      type: Object,
      required: true,
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    address: {
      street: { type: String },
      postCode: { type: String },
      city: { type: String },
    },
    pwd: { type: String },
    email: { type: String, required: true, unique: true },
    emailToken: String,
    tokenEmailDelai: Date,
    activated: { type: Boolean, default: false },
    phoneNumber: String,
    registerNumber: String,
    dateOfBird: Date,
    role: { type: Schema.Types.ObjectId, ref: "roles", required: true, autopopulate: true },
    company: { type: Schema.Types.ObjectId, ref: "companies" },
    themeColor: {
      type: Schema.Types.ObjectId,
      autopopulate: true,
      ref: "themes_colors",
      default: "5fe7abf1c0829974e2fae222", // mode normal
    },
    trade: { type: Schema.Types.ObjectId, autopopulate: true, ref: "trades" },
    leader: { type: Schema.Types.ObjectId, ref: "users" },
    sector: { type: Schema.Types.ObjectId, autopopulate: true, ref: "sectors" },
    state: {
      type: Schema.Types.ObjectId,
      required: true,
      autopopulate: true,
      ref: "states",
      default: "5fd1e209d9419ef54a0a1bc0", // state actif
    },
  },
  {
    timestamps: true,
  }
);

//see data for data ref in shemas
userSchema.plugin(require("mongoose-autopopulate"));

const Users = mongoose.model("users", userSchema);

module.exports = Users;
