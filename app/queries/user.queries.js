const { Users, Files, Roles } = require("../models");
const { v4: uuidv4 } = require("uuid");

//request create user with save() and create object instance for Users
exports.createUser = async (req) => {
  try {
    //create user instance
    const newUser = new Users({
      civility: req.body.civ,
      name: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
      address: {
        street: req.body.street,
        postCode: req.body.postCode,
        city: req.body.city,
      },
      email: req.body.email,
      pwd: req.body.password, //here this password is not define, it will be defined in the validation route of the user
      emailToken: uuidv4(), //token pour verification account
      tokenEmailDelai: Date.now() + Math.floor(1000 * 60 * 60 * 48), //delais for token verification account
      role: req.body.role,
      registerNumber: req.body.registerNumber,
      phoneNumber: req.body.phoneNumber,
      dateOfBird: req.body.dateOfBird,
      company: req.body.company,
      trade: req.body.trade,
      leader: req.body.leader,
      sector: req.body.sector,
    });
    //mongoose detects duplicates on its own and returns an error
    return newUser.save();
  } catch (error) {
    throw error;
  }
};

//request user with email
exports.findUserPerEmail = async (email) => {
  return Users.findOne({ email: email });
};

//test role user for delete others user
exports.testUserForDelete = (user, req) => {
  //user not found throw error
  if (!user) throw new Error("User no found");
  //user role => root throw error
  if (user.role.libelle === "root") throw new Error("Cannot delete a user with the root role");
  //user is not archivé throw erreur
  if (user.state.libelle !== "archivé") throw new Error('Cannot delete a user who does not have the "archived" status');
  //user role => administrteur && user connected is not role => root throw error
  if (user.role.libelle === "administrateur" && req.user.role.libelle === "administrateur")
    throw new Error("You do not have permission to remove an administrator");
};

//change one value for user, with request with user _id
exports.changeOneValueForUser = async (changeValue, req) => {
  try {
    const user = await Users.findByIdAndUpdate(
      { _id: req.body.idUser },
      { [changeValue]: req.body.idValueChange },
      { useFindAndModify: false, new: true }
    );
    if (!user) throw new Error(`cannot update ${changeValue}, user does not exis or an error has occurred`);
    return user;
  } catch (e) {
    return e;
  }
};

//update user root admin referent
exports.updateUserRefMin = async (req) => {
  try {
    //if password is define, a test is build on password, if error throw error
    if (req.body.password && req.body.passwordOld) {
      const user = await Users.findById({ _id: req.user._id });
      const password = await user.comparePassword(req.body.passwordOld);
      if (!password) throw new Error("Password is not good");
      req.body.password = await Users.hashPassword(req.body.password);
      if (req.body.password.name === "Error") throw new Error("Hash password is not possible");
    }
    //if role exist in body request, recover role in database
    //or if role is not define, recover old role this user
    const role = req.body.role ? await Roles.findOne({ libelle: req.body.role }) : req.user.role;
    //update user
    const user = await Users.findByIdAndUpdate(
      { _id: req.user._id },
      {
        name: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        },
        address: {
          street: req.body.street,
          postCode: req.body.postCode,
          city: req.body.city,
        },
        email: req.body.email,
        pwd: req.body.password || req.user.pwd, //here this password is not define, it will be defined in the validation route of the user
        role: role._id,
        registerNumber: req.body.registerNumber || req.user.registerNumber,
        phoneNumber: req.body.phoneNumber,
      },
      { useFindAndModify: false, new: true }
    );
    //if user not exist throw eror
    if (user.name === "Error") throw new Error("User is not update");
    return user;
  } catch (e) {
    return e;
  }
};
