const { Roles, Users } = require("../models");

//middle for verifed user connected
//and user actif
exports.verifUserConnect = (req, res, next) => {
  try {
    if (!req.isAuthenticated()) throw new Error("Utilisateur non connecté");
    if (!req.user.state.libelle === "actif") {
      res.clearCookie("jwt");
      throw new Error("Vous n'avez plus les droits pour vous connecter");
    }
    next();
  } catch (e) {
    next(e);
  }
};

//middle virification root user connected
exports.verifUserAccesRoot = (req, res, next) => {
  try {
    if (req.user.role.libelle !== "root") throw new Error("Utilisateur root requis");
    next();
  } catch (e) {
    next(e);
  }
};

//middle virification root, admin user connected
exports.verifUserAccesAmin = (req, res, next) => {
  try {
    if (req.user.role.libelle !== "root" && req.user.role.libelle !== "administrateur")
      throw new Error("Utilisateur minimum administrateur requis");
    next();
  } catch (e) {
    next(e);
  }
};

//middle verifed root, admin, referent user connected
exports.verifUserAccesReferent = (req, res, next) => {
  try {
    if (
      req.user.role.libelle !== "root" &&
      req.user.role.libelle !== "administrateur" &&
      req.user.role.libelle !== "référent"
    )
      throw new Error("Utilisateur minimum référent requis");
    next();
  } catch (e) {
    next(e);
  }
};

//not create user root with role admin and referent
exports.createUserHigtLevel = async (req, res, next) => {
  try {
    //test role send in body
    const role = await Roles.findById({ _id: req.body.role });
    if (!role) throw new Error("Role not found");
    //if create user root without the rights
    if (role.libelle === "root" && (req.user.role.libelle === "administrateur" || req.user.role.libelle === "référent"))
      throw new Error("Impossible de creer un utilisateur root");
    //if create user adminstrateur without the rights
    if (
      role.libelle === "administrateur" &&
      (req.user.role.libelle === "administrateur" || req.user.role.libelle === "référent")
    )
      throw new Error("Impossible de creer un utilisateur administrateur");
    next();
  } catch (e) {
    next(e);
  }
};

//not create user root with role admin and referent
exports.createUserHigtLevelRole = async (req, res, next) => {
  try {
    //test role send in body
    const role = await Roles.findById({ _id: req.body.idValueChange });
    if (!role) throw new Error("Role not found");
    //if create user root without the rights
    if (role.libelle === "root" && (req.user.role.libelle === "administrateur" || req.user.role.libelle === "référent"))
      throw new Error("Impossible de creer un utilisateur root");
    //if create user adminstrateur without the rights
    if (
      role.libelle === "administrateur" &&
      (req.user.role.libelle === "administrateur" || req.user.role.libelle === "référent")
    )
      throw new Error("Impossible de creer un utilisateur administrateur");
    next();
  } catch (e) {
    next(e);
  }
};

//not change role user root with role admin and referent
exports.changeStateHigtLevelForUserHigtLevel = async (req, res, next) => {
  try {
    const user = await Users.findByIdAndUpdate({ _id: req.body.idUser });
    if (!user) throw new Error("cannot update state, user does not exis");
    if ((user.role.libelle === "root" || user.role.libelle === "adminstrateur") && req.user.role.libelle !== "root")
      throw new Error("Impossible de modifier le rôle");
    next();
  } catch (e) {
    next(e);
  }
};
