const router = require("express").Router();

//roads
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const companiesRouter = require("./companiesRouter");
const stateRouter = require("./stateRouter");
const roleRouter = require("./roleRouter");
const sectorRouter = require("./sectorRouter");
const uploadRouter = require("./uploadRouter");
const themeColorRouter = require("./themeColorRouter");

//authentification user
router.use(authRouter);
//user roads
router.use(userRouter);
//companies roads
router.use(companiesRouter);
//state roads
router.use(stateRouter);
//role roads
router.use(roleRouter);
//sector roads
router.use(sectorRouter);
//files roads
router.use(uploadRouter);
//theme color of user
router.use(themeColorRouter);

module.exports = router;
