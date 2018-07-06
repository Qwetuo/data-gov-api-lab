const express = require("express");
const router = express.Router();
const data = require("../utils/data.json");

let orgReq = "Health Promotion Board";
let reqData = data.filter(data => data.organisation === orgReq);

let playData = reqData.map((eaData, i) => {
  let updateBody = { id: (i + 1).toString() };
      delete eaData.dataset_id
      delete eaData.date_created
      delete eaData.coverage_start
      delete eaData.coverage_end
      delete eaData.resource_name
      delete eaData.resource_id
      delete eaData.resource_description
  return { ...updateBody, ...eaData };
    // id: ,
    // organisation: '',
    // dataset_name: '',
    // last_updated: '2017-04-20',
    // description: ""
    // frequency: 'Adhoc',
    // resource_format: 'CSV'
});
var id = playData.length + 1

router.get("/", (req, res) => {
  res.json(playData)
})

router.get("/:id", (req,res,next) => {
  let getDataAtId = playData.find(eaData => eaData.id === req.params.id);
  res.json(getDataAtId === undefined ? next() : getDataAtId)
})

router.post("/", (req,res) => {
  const newData = {
    id: (id++).toString(),
    ...req.body
  }
  playData = [...playData, newData];
  res.status(201).json("Created Successfully")
})


module.exports = router;