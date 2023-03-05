const express = require("express");
const uploadMiddleware = require("../utils/handleStorage");
const {
  createItem,
  getItems,
  getItem,
  deleteItem,
} = require("../controllers/storage");
const { validatorGetItem } = require("../validators/storage");
const router = express.Router();

//Ruta  http://localhost:3000/storage
router.get("/", getItems);
router.get("/:id",validatorGetItem, getItem);
router.post("/", uploadMiddleware.single("myfile"), createItem);
router.delete("/:id",validatorGetItem, deleteItem);

module.exports = router;
