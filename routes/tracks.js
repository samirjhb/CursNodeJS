const express = require("express");
const { getItems, getItem, createItem } = require("../controllers/tracks");
const router = express.Router();

//Ruta de http://localhost/tracks GET, POST, DELETE, PUT
router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", createItem);

module.exports = router;
