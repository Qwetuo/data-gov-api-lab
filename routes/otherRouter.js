const express = require("express");
const router = express.Router();
const data = require("../utils/data.json");

// kiv - to fix - next() not sending to 404 err

router.get("/format/:format", (req, res, next) => {
  const formatData = data.filter(
    data => data.resource_format === req.params.format.toUpperCase()
  );
  res.json(formatData.length === 0 ? next() : formatData);
});

router.get("/freq/:freq", (req, res, next) => {
  const freqData = data.filter(data => data.frequency === req.params.freq);
  res.json(freqData.length === 0 ? next() : freqData);
});

module.exports = router;
