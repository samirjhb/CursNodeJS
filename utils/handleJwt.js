const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("../utils/handlePropertiesEngine")
const propetiesKey = getProperties()

/**
 * Debes de pasar el objetico del usuario
 * @param {*} user
 */
const tokenSign = async (user) => {
  const sign =  jwt.sign(
    {
      [propetiesKey.id]: user[propetiesKey.id],
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
  return sign;
};


/**
 * Debes de pasar el token de session el jwt
 * @param {*} tokenJwt 
 * @returns 
 */
const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (error) {
        return null
    }
};

module.exports = { tokenSign, verifyToken };
