const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

const route = require("./routes/route");

// connect to mongodb
mongoose.connect("mongodb://localhost:27017/contactlist", (error) => {
  if (!error) {
    console.log("Connected to monogdb");
  } else {
    console.log("Error connecting to db");
  }
});

// adding middleware
app.use(cors());
app.use(bodyParser.json());

// static files
app.use(express.static(path.join(__dirname, "/public")));

// routes
app.use("/api", route);

// testing server
app.get("/", (req, res) => {
  res.send("foobar");
});

const port = 5000;

app.listen(port, () => {
  console.log("app is listening on", port);
  console.log("hii");
});
