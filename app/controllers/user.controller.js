const { States, Users } = require("../models");
const { testUserForDelete, changeOneValueForUser } = require("../queries/user.queries");

const userController = {
  //get user
  getUser: async (req, res, next) => {
    try {
      const user = await Users.findById({ _id: req.params.id });
      if (!user) throw new Error("User no found");
      console.log("get user ok");
      res.status(200).json(user);
    } catch (e) {
      req.errorMessage = "Error get user";
      next(e);
    }
  },

  //delete user only if it is not at "root" level and with the status "completed"
  deleteUser: async (req, res, next) => {
    try {
      const user = await Users.findById({ _id: req.params.id });
      //user.queries.js => test for permission user
      testUserForDelete(user, req);
      //it's ok ? delete user
      user.delete();
      console.log("delete user ok");
      res.status(200).json({ message: "successful operation delete" });
    } catch (e) {
      req.errorMessage = "Error delete user";
      next(e);
    }
  },

  //change role user
  changeRole: async (req, res, next) => {
    try {
      const user = await changeOneValueForUser("role", req);
      console.log("update role user ok");
      res.status(200).json(user);
    } catch (e) {
      req.errorMessage = "Error update user for role";
      next(e);
    }
  },

  //change state user
  changeState: async (req, res, next) => {
    try {
      const user = await changeOneValueForUser("state", req);
      console.log("update state user ok");
      res.status(200).json(user);
    } catch (e) {
      req.errorMessage = "Error update user for state";
      next(e);
      Users.find;
    }
  },
};

module.exports = userController;
