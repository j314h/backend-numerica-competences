const userRouter = require("express").Router();

//import controllers
const userController = require("../controllers/userController");

//middleware verify
const {
  verifUserConnect,
  verifUserAccesAmin,
  verifUserAccesReferent,
  createUserHigtLevel,
} = require("../middlewares/verifyAccess.conf");

//get user with id
userRouter.get("/user/:id", verifUserConnect, verifUserAccesReferent, userController.getUser);
//create user
userRouter.post(
  "/user-create",
  verifUserConnect,
  verifUserAccesReferent,
  createUserHigtLevel,
  userController.createUser
);
//finish create user
userRouter.post("/confirme-account", userController.finishCreateUser);
//update user
userRouter.post("/user-update", verifUserConnect, verifUserAccesAmin, userController.AllUpdate);
//delete user
userRouter.delete("/user-delete/:id", verifUserConnect, verifUserAccesAmin, userController.deleteUser);

module.exports = userRouter;
