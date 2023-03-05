const express = require("express");
const uploadMiddleware = require("../utils/handleStorage");
const { createItem } = require("../controllers/storage");
const router = express.Router();

//Ruta  http://localhost:3000/storage
router.post("/", uploadMiddleware.single("myfile"), createItem);

module.exports = router;
