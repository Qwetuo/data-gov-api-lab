const express = require("express");
const router = express.Router();
const data = require("../utils/data.json");

let orgReq = "Health Promotion Board"
let reqData = data.filter(data => data.organisation === orgReq)

let playData = []

for(var i = 0; i < reqData.length; i++) {
    let templateData = {
        id: i+1
    }
    playData.push(templateData)
}

playData.forEach((eaData,i) => {
    Object.assign(eaData, reqData[i])
    delete eaData.dataset_id
    delete eaData.date_created
    delete eaData.coverage_start
    delete eaData.coverage_end
    delete eaData.resource_name
    delete eaData.resource_id
    delete eaData.resource_description
    // id: ,
    // organisation: '',
    // dataset_name: '',
    // last_updated: '2017-04-20',
    // description: ""
    // frequency: 'Adhoc',
    // resource_format: 'CSV'
})



module.exports = router;