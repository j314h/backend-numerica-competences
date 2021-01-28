const { Users, Roles } = require("../models");
const { createUser, testUserForDelete } = require("../queries/userQueries");
const email = require("../emails/Email");
const secret = "37&3%ejhjjhb&d$c4-d$mlidfdf#8ghg&9-4%yut9&0dfg#9-8%lk&hg2e#b-5&d7hjbde%e&fdf0cfdf81#18";
const Crypto = require("crypto-js");
const Bcrypt = require("bcrypt");

const userController = {
  //get user with id
  getUser: async (req, res, next) => {
    try {
      //recover user, clear pwd and send user
      const user = await Users.findById({ _id: req.params.id });
      user.pwd = "";
      res.status(200).json(user);
    } catch (e) {
      req.errorMessage = "Error get user";
      next(e);
    }
  },

  getUsersCompanySelectedOfAdmin: async (req, res, next) => {
    try {
      const users = await Users.find({ company: req.params.id });
      res.status(200).json(users);
    } catch (e) {
      req.errorMessage = "Error get user";
      next(e);
    }
  },

  //create users numerica competence
  //user is create but not validate
  createUser: async (req, res, next) => {
    try {
      //create new object user and save in database newUser if duplicate throw error
      const newUser = createUser(req);
      const user = await Users.create(newUser);

      //create object for send in email
      const data = [{ _id: user._id, token: user.emailToken }];

      //encrypt and encoded for url
      const dataCrypted = Crypto.AES.encrypt(JSON.stringify(data), secret).toString();
      const dataCryptedFormatUrl = encodeURIComponent(dataCrypted);

      //confg and send emails
      if (user) {
        email.sendEmailVerificationAccount({
          to: req.body.email,
          subject: "Numerica compétences | Création de compte",
          data: {
            userName: `${user.name.firstName.charAt(0).toUpperCase() + user.name.firstName.substr(1)} ${
              user.name.lastName.charAt(0).toUpperCase() + user.name.lastName.substr(1)
            }`,
            url: `http://localhost:8080/user-verify-create?data=${dataCryptedFormatUrl}`,
            email: user.email,
          },
        });
      }
      res.status(200).json(user);
    } catch (e) {
      req.errorMessage = "Error create user";
      next(e);
    }
  },

  //finish create user, return user.activated
  finishCreateUser: async (req, res, next) => {
    try {
      //decrypt token in email for verification user
      const dataCryptedStringify = Crypto.AES.decrypt(req.body.dataCryptedFormatUrl, secret);
      const data = JSON.parse(dataCryptedStringify.toString(Crypto.enc.Utf8));

      //test for verification user
      const user = await Users.findById({ _id: data[0]._id });
      if (!user) throw new Error("Utilisateur inconnu");
      if (user.activated === true) throw new Error("Compte déja validé");
      if (user.tokenEmailDelai < Date.now()) throw new Error("Le délais d'activation à été dépassé");
      if (user.emailToken !== data[0].token) throw new Error("Votre cléf n'est pas valide");

      //crypted password
      const salt = await Bcrypt.genSalt(15);
      const passwordCrypted = await Bcrypt.hash(req.body.password, salt);

      //update user with new informaion
      const newUser = await Users.findByIdAndUpdate(
        { _id: user._id },
        { pwd: passwordCrypted, tokenEmailDelai: Date.now(), emailToken: "", activated: true },
        { useFindAndModify: false, new: true }
      );
      res.status(200).json({ activated: newUser.activated });
    } catch (e) {
      req.errorMessage = "Error finish create user";
      next(e);
    }
  },

  //update all properties return user updated
  AllUpdate: async (req, res, next) => {
    try {
      //if password updated
      if (req.body.password && req.body.oldPassword) {
        //recover user update
        const user = await Users.findById({ _id: req.body._id });

        //compare old password with password in database
        const password = await Bcrypt.compare(req.body.oldPassword, user.pwd);
        if (!password) throw new Error("Password is not good");

        //crypt new password and add in new user
        const salt = await Bcrypt.genSalt(15);
        req.body.data.pwd = await Bcrypt.hash(req.body.password, salt);
      }

      //update user
      const newUser = await Users.findByIdAndUpdate(req.body._id, req.body.data, {
        useFindAndModify: false,
        new: true,
      });

      //clear password for send in front
      newUser.pwd = "";
      res.status(200).json(newUser);
    } catch (e) {
      req.errorMessage = "Error all update user";
      next(e);
    }
  },

  //delete user only
  //do not delete if user at "root" role
  //and with the state "actif"
  deleteUser: async (req, res, next) => {
    try {
      //recover user and test for permission
      //user.queries.js => test for permission user
      const user = await Users.findById({ _id: req.params.id });
      testUserForDelete(user, req);

      //it's ok ? delete user and send true value
      await Users.findByIdAndDelete(user._id);
      res.status(200).json({ delete: true });
    } catch (e) {
      req.errorMessage = "Error delete user";
      next(e);
    }
  },
};

module.exports = userController;
