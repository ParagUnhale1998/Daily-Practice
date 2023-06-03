const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDb");

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });


const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter THe Name > No Name Specify?"],
  },
  rating: {
    //more than 5 rating is not allowed
    type: Number,
    min: 1,
    max: 5,
  },
  //   rating:Number,
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const kiwi = new Fruit({
  name: "kiwi",
  rating: 5,
  review: "one apple a day keep doctor away",
});

// kiwi.save()
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  // favouritefruite:fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const keri = new Fruit({
  name: "keri",
  rating: 5,
  review: "best one",
});
//   keri.save()

// const paragUnhale = new Person({
//   name: "sanket Unhale",
//   age: 15,
//   favouritefruite: kiwi
// });
// const sanketUnhale = new Person({
//     name: "anshul Unhale",
//     age: 18,
//     favouritefruite: pineapple
//   });

//   const mahiUnhale = new Person({
//     name: "mahi Unhale",
//     age: 15,
//     favouritefruite: pineapple
//   });

// mahiUnhale.save()

// Person.insertMany([paragUnhale, sanketUnhale])
// .then(()=>{
//   console.log("succesfuly Saved All Peoples Items");
// }).catch((err)=>{
//   console.log(err);
// })

// Person.updateOne({ name: "parag Unhale" }, { favouritefruite: kiwi })
//   .then(() => {
//     console.log("Successfully updated");
//   })
//   .catch((err) => {
//     console.log(err);
//   });


Person.find()
  .then((people) => {
    //   mongoose.connection.close();
      console.log("Successfully displayed all persons' names");
      people.forEach((person) => {
          console.log(person);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    
    //   Person.deleteOne({name:"mahi Unhale"}).then((err) =>{
    //     console.log(err);
    // })
    
// Person.insertMany([paragUnhale, sanketUnhale])
//   .then(() => {
//     console.log("Successfully saved all people's items");
//     return Person.find();
//   })
//   .then((people) => {
//     // mongoose.connection.close();
//     console.log("Successfully displayed all persons' names");
//     people.forEach((person) => {
//       console.log(person);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });


// Fruit.find()
//   .then((fruits) => {
//     mongoose.connection.close();
//     console.log("succesfuly Display All Fruits Names");
//     fruits.forEach((fruits) => {
//       console.log(fruits.name);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });


