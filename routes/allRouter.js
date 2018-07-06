const express = require("express");
const router = express.Router();
const data = require("../utils/data.json");

router.get("/", (req, res) => {
  res.json(data);
});

// NOT WORKING!!!
// router.post("/", (req,res) => {
//   data = [...data, req.body];
//   res.json("Added successfully")
// })



router.get("/search", (req, res, next) => {
  const filteredData = data
  .filter(data => (req.query.format ? data.resource_format === req.query.format.toUpperCase() : true))
  .filter(data => (req.query.freq ? data.frequency === req.query.freq : true))
  .filter(data => (req.query.org ? data.organisation.includes(req.query.org) : true))
  .filter(data => (req.query.name ? data.dataset_name.includes(req.query.name) : true))
  filteredData.length === 0 ? next() : res.json(filteredData);
});

module.exports = router;
