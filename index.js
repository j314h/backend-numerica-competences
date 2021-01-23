require("dotenv").config();
const express = require("express");
const app = express();
require("./app/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { error } = require("./app/middlewares/error.conf");
const path = require("path");

const PORT = process.env.PORT || 8000;

exports.app = app;

//security cors forbidden now is config of develop product
app.use(
  cors({
    origin: ["http://localhost:8080"],
    credentials: true,
  })
);

//write format cookie
app.use(cookieParser());

//middle for jwt
require("./app/middlewares/jwt.conf");
require("./app/middlewares/verifyAccess.conf");

//call router app
const route = require("./app/routers/router");

//post => body
//parse json
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middle of router and error
app.use(route);
app.use(error);

//listen server
app.listen(PORT, () => {
  console.log(`server start sur ${PORT}`);
});
