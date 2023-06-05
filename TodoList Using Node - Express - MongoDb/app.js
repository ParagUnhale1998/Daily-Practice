const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// First Create Mongo Server
const mongoose = require("mongoose");
const uri = "mongodb+srv://admin-parag:parag123@todolist.7gpaqgc.mongodb.net/?retryWrites=true&w=majority";
// mongoose.connect("mongodb://localhost:27017/todolistDB");
mongoose.connect(uri);
// create mongo schema for todo input value datatypes
const itemSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemSchema);
/// this id default 3 todos when i open the app 
const item1 = new Item({
  name: "Welcome to TodoList",
});
const item2 = new Item({
  name: "Enter The Task",
});
const item3 = new Item({
  name: "Add the Task -->",
});

const defaultItems = [item1, item2, item3];

// this is for embeded javascript we use ejs for mix html javascript and componants 
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// for static file like public and inside public we create index. html style.css
app.use(express.static("public"));

// the is home route / by default route 
app.get("/", (req, res) => {
  // find item in database 
  Item.find({})
    .then((foundItems) => {
      // if item is not there the create by default 3 items and show 
      if (foundItems.length === 0) {
        Item.insertMany(defaultItems)
          .then(() => {
            console.log("Successfully inserted all items");
            res.redirect("/");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // otherwise create new item and add to old items
        // and pass this to list.ejs file  to props like listname and list items
        res.render("list", { listName: "today", newListItems: foundItems });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//create listschema for more list like home , work , today etc
const listSchema = {
  name: String,
  items: [itemSchema],
};

const List = mongoose.model("List", listSchema);


app.get("/:customListName", (req, res) => {
  const customListName = req.params.customListName;
  // this is for every route we use 
  List.findOne({ name: customListName })

    .then((foundList) => {
      // if work route is not there then  create 
      if (!foundList) {
        console.log("List doesn't exist!");
        // create work and add default 3 items for every route 
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        list
          .save()
          .then(() => {
            res.redirect("/" + customListName);
          })
          .catch((err) => {
            console.log(err);
            res.redirect("/");
          });
      } else {
        console.log("List exists!");
        // if work is there then transfer this data to list and show 
        res.render("list", {
          listName: foundList.name,
          newListItems: foundList.items,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
});

// for input value like new items we craete like new task 
app.post("/", (req, res) => {
  const itemName = req.body.newItem;
  const listName = req.body.list;
  // create new task only string type like "create a simple todo list "
  const newItem = new Item({
    name: itemName,
  });

  // if if are in today route then add the input value like task to today database in mongoss and show 
  if (listName === "today") {
    newItem
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    // if we are in work route or other then we find the route and push the new items to work or any route 
    List.findOneAndUpdate({ name: listName }, { $push: { items: newItem } })
      .then(() => {
        res.redirect("/" + listName);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

// for delete task of any route 
app.post("/:listName/delete", (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.params.listName;

  // if we are in today route then only delete item of today todolist database 
  if (listName === "today") {
    Item.findByIdAndRemove(checkedItemId)
      .then(() => {
        console.log("Successfully deleted item from today");
        // when delete is done then go to this route
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    // if we are in differet route like home , work the find the route name and pull like pop the item from this route and delete 
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } }
    )
      .then(() => {
        console.log(`Successfully deleted item from ${listName}`);
        res.redirect("/" + listName);
        // when delete is done the go to this route like where item is delte 
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

// for serever started at localhost:1000/
app.listen(1000, () => {
  console.log("Server started on port 1000");
});
