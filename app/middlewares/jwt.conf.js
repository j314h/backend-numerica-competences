const secret = process.env.SECRET;
const { app } = require("../../index");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");

//param token
const createJwtToken = ({ user = null, id = null }) => {
  const tokenApi = jwt.sign(
    {
      sub: id || user._id.toString(),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, //time 24 minuites for token validate
    },
    secret
  );
  return tokenApi;
};

exports.createJwtToken = createJwtToken;

//check token for expired and refresh
//if the token date is smaller compared
//to the execution date of this function
//and it has expired less than a day, we refresh the token
const checkExpiredToken = (token, res) => {
  const nowSec = Math.floor(Date.now() / 1000);
  if (nowSec <= token.exp) {
    return token;
  } else if (nowSec > token.exp && nowSec - token.exp < 60 * 60 * 24) {
    const refreshToken = createJwtToken({ id: token.sub });
    res.cookie("jwt", refreshToken);
    return jwt.verify(refreshToken, secret, { ignoreExpiration: true });
  } else {
    throw new Error("Token non valide");
  }
};

//verification this validate token
const extractUserFromToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      let verifJwt = jwt.verify(token, secret, { ignoreExpiration: true });
      verifJwt = checkExpiredToken(verifJwt, res);
      const user = await Users.findById(verifJwt.sub);
      req.user = user;
      next();
    } catch (error) {
      res.clearCookie("jwt");
      req.errorMessage = "Token non valide";
      next(e);
    }
  } else {
    next();
  }
};

//create feature for loggout and login and authenticate
const addJwtFeatures = (req, res, next) => {
  req.isAuthenticated = () => !!req.user;
  req.logout = () => res.clearCookie("jwt");
  req.login = (user) => {
    const token = createJwtToken({ user });
    res.cookie("jwt", token);
  };
  next();
};

app.use(extractUserFromToken);
app.use(addJwtFeatures);
