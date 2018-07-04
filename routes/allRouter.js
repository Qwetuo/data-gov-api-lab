const express = require("express");
const router = express.Router();
const data = require("../utils/data.json");



router.get("/all", (req, res) => {
  res.json(data);
});

router.get("/all/search", (req, res) => {
    var filteredData = data
    filteredData = filteredData.filter(data => req.query.format && data.resource_format == req.query.format.toUpperCase());
    filteredData = filteredData.filter(data => req.query.freq && data.frequency == req.query.freq);
    //try fuzzy matching req.query.freq.includes(req.query.freq)
    res.json(filteredData)
  });

module.exports = router;
