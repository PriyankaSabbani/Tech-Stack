const express = require("express");
const router = express.Router();
const { getTransport } = require("../controllers/transportController");

router.get("/", getTransport);

module.exports = router;
