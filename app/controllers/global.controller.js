const { Roles, States } = require('../models');

const globalController = {
  //get all states
  getAllStates: async (req, res, next) => {
    try {
      const states = await States.find();
      res.status(200).json(states);
      console.log('All roles send');
    } catch (e) {
      req.errorMessage = 'Error get states';
      next(e);
    }
  },

  //get all roles
  getAllRoles: async (req, res, next) => {
    try {
      const roles = await Roles.find();
      res.status(200).json(roles);
      console.log('All roles send');
    } catch (e) {
      req.errorMessage = 'Error get roles';
      next(e);
    }
  },
};

module.exports = globalController;
