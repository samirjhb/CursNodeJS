const { storageModel } = require("../models");
const PUBLIC_URL= process.env.PUBLIC_URL;

/**
 *  Obtener todo los registro
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  const data = await storageModel.find({});
  res.send({ data });
};

/**
 *  Obtener un registro
 * @param {*} req
 * @param {*} res
 */
const getItem = (req, res) => {};

/**
 *  Crear un registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  const { body, file } = req;
  const fileData ={
    filename: file.filename,
    url: `${PUBLIC_URL}/${file.filename}`

  }
  const data = await storageModel.create(fileData);
  res.send({ data });
};

/**
 *  Actualizar un registro
 * @param {*} req
 * @param {*} res
 */
const updateItem = (req, res) => {};

/**
 *  Eliminar un registro
 * @param {*} req
 * @param {*} res
 */
const deleteItem = (req, res) => {};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
