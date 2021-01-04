const { States, Users, Companies } = require("../models");
const { testUserForDelete, changeOneValueForUser, updateUserRefMin } = require("../queries/user.queries");

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
    }
  },

  //update user root admin referent
  updateUserRootAdminRef: async (req, res, next) => {
    try {
      const user = await updateUserRefMin(req);
      //if update user is not good throw error
      if (user.name === "Error") throw new Error(user.message);
      console.log("update user ok");
      //if user update is good
      req.login(user);
      res.status(200).json(user);
    } catch (e) {
      req.errorMessage = "Error update user";
      next(e);
    }
  },

  //update companies for user root administrateur referent
  updateCompanyForUser: async (req, res, next) => {
    try {
      //recover company and update there info
      const company = await Companies.findOneAndUpdate(
        { siret: req.body.siret },
        {
          name: req.body.name,
          address: {
            street: req.body.street,
            postCode: req.body.postCode,
            city: req.body.city,
          },
          filliale: req.body.filliale,
          siret: req.body.siret,
          naf: req.body.naf,
          phoneNumber: req.body.phoneNumber,
        },
        { useFindAndModify: false, new: true }
      );
      //company is not define
      if (company.name === "Error") throw new Error("Company is not found");
      //recover user and update id for new company
      const user = await Users.findOneAndUpdate(
        { email: req.body.email },
        { company: company._id },
        { useFindAndModify: false, new: true }
      );
      //user is note define
      if (user.name === "Error") throw new Error("User is not found");
      //if user update is good
      req.login(user);
      res.status(200).json(user);
    } catch (e) {
      req.errorMessage = "Error update company of user";
      next(e);
    }
  },
};

module.exports = userController;
