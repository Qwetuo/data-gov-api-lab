const express = require("express");
const bodyParser = require("body-parser");
const allRouter = require("./routes/allRouter");
const formatRouter = require("./routes/formatRouter")

const data = require("./utils/data.json");

const app = express();
app.use(bodyParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.json("Welcome to Data.gov.sg Dataset Listing");
  });

app.use("/", allRouter);
app.use("/", formatRouter)

// app.get("/", (req,res) => {
//     res.json("Welcome to Data.gov.sg Dataset Listing")
//     // res.json(data)
// })

// TODO: Create CRUD endpoints for your data!



app.use(function(req, res, next) {
    res.status(404).json("Not found!");
  });

module.exports = app;
