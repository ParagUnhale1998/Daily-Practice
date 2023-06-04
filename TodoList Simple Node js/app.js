const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let itemsList = ["Create Projects", "practise more", "learn more"];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let day = today.toLocaleDateString("en-US", options);

    res.render("list", { kindofday: day, newListItems: itemsList });

});

app.post("/", (req, res) => {
  var item = req.body.newItem;
  console.log(item);
  itemsList.push(item);
  res.redirect("/");
});
app.listen(1000, () => {
  console.log("server started");
});
