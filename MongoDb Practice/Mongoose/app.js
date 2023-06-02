const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDb");

const fruitSchema = new mongoose.Schema({
  name: String,
  // rating: {
  //   type :Number,
  //   min:1,
  //   max:5
  // },
  rating:Number,
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "apple",
  rating: 5,
  review: "one apple a day keep doctor away",
});

//  fruit.save()

const mango = new Fruit({
  name: "mango",
  rating: 5,
  review: "one mango a day keep doctor away",
});

const banana = new Fruit({
  name: "banana",
  rating: 4,
  review: "one banana a day keep fat away",
});

// Fruit.insertMany([banana, mango], function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("succesfuly Saved All Fruits Items");
//   }
// });

//  latest version does not use callbacks so i use promicess

// Fruit.insertMany([banana, mango]).then(()=>{
//   console.log("succesfuly Saved All Fruits Items");
// }).catch((err)=>{
//   console.log(err);
// })
Fruit.find()
.then((fruits) =>{
  mongoose.connection.close()
  // console.log(fruits);
  fruits.forEach((fruits)=>{
    console.log(fruits.name)
  })
})
.catch((err) =>{
  console.log(err);
})

//  latest version does not use callbacks so i use promicess

// Fruit.find(function (err, fruits) {
//   if (err) {
//     console.log(err);
//   } else {
//     mongoose.connection.close()
//     // console.log(fruits);
//     fruits.forEach((fruits)=>{
//       console.log(fruits.name)
//     })
//   }

// });
