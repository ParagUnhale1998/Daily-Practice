const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let itemsList = ["Create Projects", "practise more", "learn more"];
let workItems = [];

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
  res.render("list", { listTitle: day, newListItems: itemsList });
});

app.post("/", (req, res) => {
  let item = req.body.newItem;
console.log(req.body.list)
  if (req.body.list == "Work List") {
    console.log(req.body.list)
    workItems.push(item);
    res.redirect("/work");
    // console.log('hey')
    // req.body.list.value = "";
  } else {
    console.log(req.body.list)
    itemsList.push(item);
    res.redirect("/");
    // console.log('by')
  }
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

// app.post('/work',(req,res) => {
//   let item = req.body.newItem;
//   workItems.push(item)
//   res.redirect("/work");
// })
app.listen(1000, () => {
  console.log("server started");
});
