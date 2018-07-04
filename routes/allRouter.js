const express = require("express");
const router = express.Router();
const data = require("../utils/data.json");

router.get("/", (req, res) => {
  res.json(data);
});

// kiv - filter not working, to change to nested filter + next not going to err 404

router.get("/search", (req, res, next) => {
  var filteredData = data;
  filteredData = filteredData.filter(
    data =>
      req.query.format &&
      data.resource_format === req.query.format.toUpperCase()
  );
  filteredData = filteredData.filter(
    data => req.query.freq && data.frequency === req.query.freq
  );
  // kiv .includes not working --> data not matching
  // filteredData = filteredData.filter(data => req.query.name && data.dataset_name.includes(req.query.name));
  res.json(filteredData.length === 0 ? next() : filteredData);
});

module.exports = router;
