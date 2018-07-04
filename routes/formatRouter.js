const express = require("express");
const router = express.Router();
const data = require("../utils/data.json");

router.get("/:format", (req, res, next) => {
    const formatData = data.filter(data => data.resource_format == req.params.format.toUpperCase());
    res.json(formatData)
    console.log(data[0].resource_format)
    // console.log(req.params.format)
    // if (req.params.format == "test"){
    // res.json('working')
    // }
    // next()
  });

module.exports = router;