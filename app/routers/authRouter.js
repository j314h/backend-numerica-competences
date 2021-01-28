const authRouter = require("express").Router();

//import controllers
const authController = require("../controllers/authController");

//middleware verify
const { verifUserConnect, verifUserAccesReferent } = require("../middlewares/verifyAccess.conf");

//deconnect user
authRouter.get("/sign-out", authController.signOut);
//connect user
authRouter.post("/sign-in", authController.signIn);
//verified connect
authRouter.get("/verification-connect", verifUserConnect, authController.verificationConnect);
//roads for token api ROME + data for auth user
authRouter.get("/access-token-api-rome", verifUserConnect, verifUserAccesReferent, authController.accessTokenApiRome);

module.exports = authRouter;
