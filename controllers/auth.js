const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { usersModel } = require("../models");
const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");

/**
 *  Este controlador tiene como finalidad registro de user incritado y con su token
 * @param {*} req
 * @param {*} res
 */
const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, { strict: false });
    //Agregar el token
    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_REGISTER_USER 😪😪");
  }
};

/**
 * Este controlador tiene como finalidad logiar user
 * @param {*} req
 * @param {*} res
 */

const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await usersModel
      .findOne({ email: req.email })
    if (!user) {
      handleHttpError(res, "USER_NOT_EXISTS 😪😪", 404);
      return;
    }
    //COMPARACION DE CONTRASEñA
    const hashPassword = user.get("password");
    const check = await compare(req.password, hashPassword);
    if (!check) {
      handleHttpError(res, "PASSWORD_INVALID 😪😪", 401);
      return;
    }
    user.set("password", undefined, { strict: false });
    //Si la contraseña es correcta envia token
    const data = {
      token: await tokenSign(user),
      user,
    };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_LOGIN_USER 😪😪");
  }
};
module.exports = { registerCtrl, loginCtrl };
