const express = require("express");
const router = express.Router();
const { getFees } = require("../controllers/feeController");

router.get("/:id", getFees);

module.exports = router;
