const qs = require("qs");
const axios = require("axios");
const { createUser, findUserPerEmail } = require("../queries/user.queries");
const { ApiRome, Roles, Users } = require("../models/index");
const email = require("../emails/Email");
const secret = "37&3%ejhjjhb&d$c4-d$mlidfdf#8ghg&9-4%yut9&0dfg#9-8%lk&hg2e#b-5&d7hjbde%e&fdf0cfdf81#18";
const jwt = require("jsonwebtoken");

const authController = {
  //token api rome
  accessTokenApiRome: async (req, res, next) => {
    try {
      const token = await axios.post(ApiRome.url, qs.stringify(ApiRome.data), ApiRome.header);
      res.status(200).json({ tokenApiRome: token.data.access_token });
      console.log("Token api rome send");
    } catch (e) {
      req.errorMessage = "Error access token api rome";
      next(e);
    }
  },

  //create users numerica competence
  //user is create but not validate
  signUp: async (req, res, next) => {
    try {
      //create user, mongodb automatically manages duplicates
      //if duplicate => trow error
      const user = await createUser(req);
      //confg and send email
      if (user) {
        email.sendEmailVerificationAccount({
          to: req.body.email,
          subject: "Numerica compétences | Création de compte",
          data: {
            userName: `${user.name.firstName.charAt(0).toUpperCase() + user.name.firstName.substr(1)} ${
              user.name.lastName.charAt(0).toUpperCase() + user.name.lastName.substr(1)
            }`,
            url: `https://localhost:8080/user-verify-create/${user._id}/${user.emailToken}`,
            email: user.email,
          },
        });
      }
      res.status(200).json(user);
      console.log("CreateUser OK");
    } catch (e) {
      req.errorMessage = "Error create user";
      next(e);
    }
  },

  //connect user
  signIn: async (req, res, next) => {
    try {
      //test user exist else throw error
      const user = await findUserPerEmail(req.body.email);
      if (!user) throw new Error("User not found");
      //compare password with password user in bdd else trhow error
      const testPassword = await user.comparePassword(req.body.password);
      if (!testPassword) throw new Error("Password not found");
      //if user state => archivé permission denied => throw error
      if (user.state.libelle !== "actif") throw new Error("You don't have permission to connect");
      //if not error
      //destructuring for switch pwd
      const { pwd, ...newUser } = user._doc;
      req.login(user);
      res.status(200).json(newUser);
      console.log("sign in ok");
    } catch (e) {
      req.errorMessage = "Error sign in user";
      next(e);
    }
  },

  //disconnect user
  signOut: (req, res, next) => {
    try {
      //delete jwt
      req.logout();
      //send response good and state connexion
      res.status(200).json({ connextion: false });
      console.log("logout is ok");
    } catch (e) {
      req.errorMessage = "Error logout user";
      next(e);
    }
  },

  redirectConnect: async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      try {
        let verifJwt = jwt.verify(token, secret, { ignoreExpiration: true });
        const user = await Users.findById(verifJwt.sub);
        if (!user) throw new Error("User not found");
        //destructuring for switch pwd
        const { pwd, ...newUser } = user._doc;
        req.login(user);
        res.status(200).json(newUser);
        console.log("redirect connect ok");
      } catch (e) {
        req.errorMessage = "Error user not found";
        next(e);
      }
    } else {
      req.errorMessage = "Token is not found";
      next(e);
    }
  },
};

module.exports = authController;
