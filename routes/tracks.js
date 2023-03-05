const express = require("express");
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/tracks");
const { validatorCreateItem, validatorGetItem } = require("../validators/tracks");
const customHeader = require("../middleware/customHeader");
const router = express.Router();

//Ruta de http://localhost/tracks GET, POST, DELETE, PUT
router.get("/", getItems);
router.get("/:id", validatorGetItem, getItem);
router.post("/", validatorCreateItem, createItem);
router.put("/:id", validatorCreateItem, validatorGetItem, updateItem);
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;
