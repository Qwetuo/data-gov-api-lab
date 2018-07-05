const express = require("express");
const router = express.Router();
const data = require("../utils/data.json");

playData = data.filter(data => data.organisation === "Health Promotion Board")

module.exports = router;