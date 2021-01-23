const { Roles } = require("../models");

const roleController = {
  //get all roles
  getAllRoles: async (req, res, next) => {
    try {
      const roles = await Roles.find();
      res.status(200).json(roles);
    } catch (e) {
      req.errorMessage = "Error get all roles";
      next(e);
    }
  },
};

module.exports = roleController;
