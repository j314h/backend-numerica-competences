const qs = require("qs");
const axios = require("axios");
const bcrypt = require("bcrypt");
const { ApiRome, Users } = require("../models/index");

const authController = {
  //token api rome return token api rome
  accessTokenApiRome: async (req, res, next) => {
    try {
      const token = await axios.post(ApiRome.url, qs.stringify(ApiRome.data), ApiRome.header);
      console.log("Token api rome send");
      res.status(200).json({ tokenApiRome: token.data.access_token });
    } catch (e) {
      req.errorMessage = "Error access token api rome";
      next(e);
    }
  },

  //connect user return user without password
  signIn: async (req, res, next) => {
    try {
      //recover user with email if user state => archivé permission denied => throw error
      const user = await Users.findOne({ email: req.body.email });
      if (user.state.libelle !== "actif") throw new Error("You don't have permission to connect");

      //test password user
      const testPassword = await bcrypt.compare(req.body.password, user.pwd);
      if (!testPassword) throw new Error("Password not found");

      //user in cookie
      req.login(user);

      //delete pwd in user for send in front
      user.pwd = "";
      res.status(200).json(user);
    } catch (e) {
      req.errorMessage = "Error sign in user";
      next(e);
    }
  },

  //disconnect user return object connexion false
  signOut: (req, res, next) => {
    try {
      //delete jwt
      req.logout();
      res.status(200).json({ connextion: false });
    } catch (e) {
      req.errorMessage = "Error logout user";
      next(e);
    }
  },
};

module.exports = authController;
