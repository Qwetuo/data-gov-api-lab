const express = require("express");
const router = express.Router();
const data = require("../utils/data.json");


router.get("/format/:format", (req, res, next) => {
  const formatData = data.filter(
    data => data.resource_format === req.params.format.toUpperCase()
  );
  formatData.length === 0 ? next() : res.json(formatData);
});

router.get("/freq/:freq", (req, res, next) => {
  const freqData = data.filter(data => data.frequency === req.params.freq);
  freqData.length === 0 ? next() : res.json(freqData);
});

module.exports = router;
