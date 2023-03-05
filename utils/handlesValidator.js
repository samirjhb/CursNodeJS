const { validationResult } = require("express-validator");

const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next(); //continuar hacia el controlador
  } catch (error) {
    res.status(403); // Si no error
    res.send({ errors: error.array() });
  }
};
module.exports = validateResults;
