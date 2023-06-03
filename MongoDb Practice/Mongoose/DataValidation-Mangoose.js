const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDb");

const fruitSchema = new mongoose.Schema({
  name:{
    type:String,
     required:[true,"Please Enter THe Name > No Name Specify?"]
  },
  rating: {
    //more than 5 rating is not allowed
    type:Number,
    min:1,
    max:5
  },
//   rating:Number,
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const kiwi = new Fruit({
  name: "kiwi",
  rating: 5,
  review: "one apple a day keep doctor away",
});

// kiwi.save()

// const mango = new Fruit({
//   name: "mango",
//   rating: 5,
//   review: "one mango a day keep doctor away",
// });

// const banana = new Fruit({
//   name: "banana",
//   rating: 4,
//   review: "one banana a day keep fat away",
// });

// Fruit.insertMany([banana, mango]).then(()=>{
//   console.log("succesfuly Saved All Fruits Items");
// }).catch((err)=>{
//   console.log(err);
// })
Fruit.find()
.then((fruits) =>{
  mongoose.connection.close()
  console.log("succesfuly Display All Fruits Names");
  fruits.forEach((fruits)=>{
    console.log(fruits.name)
})
})
.catch((err) =>{
  console.log(err);
})

// Fruit.deleteOne({name:"peru"}).then((err) =>{
//     console.log(err); 
// })
