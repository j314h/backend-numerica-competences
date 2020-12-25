const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
      numberStreet: { type: String },
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
    dateOfBird: String,
    role: { type: Schema.Types.ObjectId, ref: "roles", required: true, autopopulate: true },
    company: { type: Schema.Types.ObjectId, autopopulate: true, ref: "companies" },
    themeColor: {
      type: Schema.Types.ObjectId,
      autopopulate: true,
      ref: "themes_colors",
      default: "5fe63755f99bceafba15b55c",
    },
    trade: { type: Schema.Types.ObjectId, autopopulate: true, ref: "trades" },
    leader: { type: Schema.Types.ObjectId, autopopulate: true, ref: "users" },
    sector: { type: Schema.Types.ObjectId, autopopulate: true, ref: "sectors" },
    state: {
      type: Schema.Types.ObjectId,
      autopopulate: true,
      required: true,
      ref: "states",
      default: "5fd1e209d9419ef54a0a1bc0",
    },
  },
  {
    timestamps: true,
  }
);

//see data for data ref in shemas
userSchema.plugin(require("mongoose-autopopulate"));

//hash password
userSchema.statics.hashPassword = async (pwd) => {
  try {
    const salt = await bcrypt.genSalt(15);
    return bcrypt.hash(pwd, salt);
  } catch (error) {
    throw error;
  }
};

//compare hash password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.pwd);
};

const Users = mongoose.model("users", userSchema);

module.exports = Users;
