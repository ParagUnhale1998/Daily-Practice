const express = require("express");
const bodyParser = require("body-parser");
// const request= require('request')
const app = express();

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.listen(3005, function (req, res) {
  console.log("server started");
});
