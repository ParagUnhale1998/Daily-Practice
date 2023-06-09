const express = require("express");
const bodyParser = require("body-parser");
// const request= require('request')
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  let fname = req.body.fname;
  let lname = req.body.lname;
  let email = req.body.email;
 console.log(fname,lname,email)
});

app.listen(3002, function (req, res) {
  console.log("server started");
});
