//all the errors of all the routes pass here
//returns a status 500 and an error message to configure in the routes
exports.error = (err, req, res, next) => {
  const errProd = {
    code: err.code,
    message: err.message,
    myError: req.errorMessage,
  };
  const errDev = {
    code: err.code,
    message: err.message,
    myError: req.errorMessage,
    stack: err.stack,
  };
  process.env.NODE_ENV === "production" ? res.status(500).json({ errProd }) : res.status(400).json(errDev);
};
