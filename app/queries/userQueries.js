const { Users } = require("../models");
const { v4: uuidv4 } = require("uuid");

//create user instance
exports.createUser = (req) => {
  const newUser = new Users({
    civility: req.body.civility,
    name: {
      firstName: req.body.name.firstName,
      lastName: req.body.name.lastName,
    },
    address: {
      street: req.body.address.street,
      postCode: req.body.address.postCode,
      city: req.body.address.city,
    },
    pwd: req.body.pwd, //here this password is not define, it will be defined in the validation route of the user
    email: req.body.email,
    emailToken: uuidv4(), //token pour verification account
    tokenEmailDelai: Date.now() + Math.floor(1000 * 60 * 60 * 48), //delais for token verification account
    //activated: value default is false
    phoneNumber: req.body.phoneNumber,
    registerNumber: req.body.registerNumber,
    role: req.body.role,
    company: req.body.company,
    //themeColor: value default is _id basic mode
    trade: req.body.trade,
    leader: req.body.leader,
    sector: req.body.sector,
    //state: value default _id actif
  });
  return newUser;
};

//test role user for delete others user
exports.testUserForDelete = (user, req) => {
  //user not found throw error
  if (!user) throw new Error("Utilisateur inconnu");

  //user role => root throw error
  if (user.role.libelle === "root") throw new Error("Impossible de supprimer l'utilisateur root");

  //user is not archivé throw erreur
  if (user.state.libelle !== "archivé")
    throw new Error("Impossible de supprimer un utilisateur si il n'est pas archivé");

  //user role => administrteur && user connected is not role => root throw error
  if (user.role.libelle === "administrateur" && req.user.role.libelle === "administrateur")
    throw new Error("Vous n'avez pas les droit pour supprimer un utilisateur administrateur");
};
