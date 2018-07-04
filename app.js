const express = require("express");
const bodyParser = require("body-parser");
const allRouter = require("./routes/allRouter");
const otherRouter = require("./routes/otherRouter");

const app = express();
app.use(bodyParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Welcome to Data.gov.sg Dataset Listing");
});

app.use("/all", allRouter);
app.use("/", otherRouter);

app.use(function(req, res, next) {
  res.status(404).json("Not found!");
});

app.use(function(err, req, res, next) {
  res.status(500).json("Something broke!");
});

module.exports = app;
