const users = [
    {
        id: 1,
        name: "John Doe",
        age: 30,
        email: "john@example.com",
    },
    {
        id: 2,
        name: "Jane Smith",
        age: 25,
        email: "jane@example.com",
    },
    {
        id: 3,
        name: "Bob Johnson",
        age: 40,
        email: "bob@example.com",
    },
    {
        id: 4,
        name: "Alice Brown",
        age: 35,
        email: "alice@example.com",
    },
    {
        id: 5,
        name: "eve Wilson",
        age: 35,
        email: "examplea@gmail.com"
    }
];

const userA = {
    id: 3,
    name: "eve Wilson",
    age: 28,
    email: "examplea@gmail.com"
}

function replaceValue(arr) {
    arr.splice(2, 1, userA)
    return arr
}
// console.log(replaceValue(users))

// How do you access the age of the second user in the users array?
function accessAge(names) {
    const findUserbyName = users.findIndex(user => user.name === names)
    const age = users[findUserbyName].age;
    return age
}
// console.log(accessAge('Jane Smith'))

//Add a new user object with id: 5, name: "Eva Green," age: 28, and email: "eva@example.com" to the users array.
const newUser = {
    id: 5, 
    name: "Eva Green" ,
    age: 28, 
    email: "eva@example.com"
}

function addUsers(arr,user){
    arr.push(user)
    return arr
}
// console.log(addUsers(users,newUser))

//Remove the user with id 3 from the users array. 

function removeUser(arr,id){
    const findUserByID = arr.findIndex(user => user.id === id)
     arr.splice(findUserByID,1)
     return arr
}
// console.log(removeUser(users,3))

//Update the email address of the first user to "john.doe@gmail.com."

function updateEmail(arr,id,email){
  const findUserindex = arr.findIndex(user => user.id === id)
  arr[findUserindex].email = email
  return arr
}
// console.log(updateEmail(users,4,'john.doe@gmail.com'))

// Use a loop to log the names of all users in the users array.

function loopArrNames(arr){
return arr.map(user => user.name)
}
// console.log(loopArrNames(users))

//Check if the user with id 4 exists in the users array.

function checkuser(arr,id){
    finduser = !!arr.find(user => user.id === id)
    return finduser
}
// console.log(checkuser(users,5))

//Find the index of the user with the email "jane@example.com" in the users array.

function findUserByEmail(arr,email){
    const findUser = arr.findIndex(user => user.email === email)
    return findUser
}
// console.log(findUserByEmail(users,"alice@example.com"))

//Create a new array containing only the users aged 30 and above.

function createNewArray(arr){
    const newArray = arr.filter(user => user.age >= 30)
    return newArray
}
// console.log(createNewArray(users))

//Sort the users array based on the user's names in alphabetical order.
function sortUserByNames(arr){
    const sortedUsers = arr.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      return sortedUsers;
}
// console.log(sortUserByNames(users))

//Sort the users array based on the users' ages in ascending order.
function sortUserAge(array){
    const sortedUsers = array.sort((a, b) => a.age - b.age);
 return sortedUsers
}
// console.log(sortUserAge(users))

//Using the forEach method, log the email addresses of all users in the users array.
function logEmailAddress(arr){
arr.forEach((user) => console.log(user.email))
}
// console.log(logEmailAddress(users))

//Remove any duplicate ages from the users array and create a new array with unique age values.

function removeDuplicateAge(array){
   /* const uniqueAges = {};
    const uniqueArray = array.filter((item) => {
        if (!uniqueAges[item.age]) {
          // If the age is not encountered before, mark it as encountered
          uniqueAges[item.age] = true;
          return true;
        }
        return false;
      });
    
      return uniqueArray;*/
      /*const uniqueArray = array.reduce((result, item) => {
        if (!result.some((existingItem) => existingItem.age === item.age)) {
            result.push(item);
        }
        return result;
      }, []);
      return uniqueArray;*/

      const uniqueArray = Array.from(new Set(array.map(item => item.age))).map(age => array.find(item => item.age === age));
      return uniqueArray;

}
// console.log(removeDuplicateAge(users))

//Check if the users array includes a user with the name "Alice Brown" and log the result.
function includesUser(array,name){
    const hasUser = array.some(user => user.name === name);
    const usingInclude = array.map(user => user.name).includes(name)
    console.log(usingInclude)
    return hasUser
}
// console.log(includesUser(users,'Alice Brown'))

//Deconstruct/destructure  the user with id 2 from the users array and log the result.
function userDestructure(array,id){
  const findUser = array.find(user => user.id === id)
    const {name,age,email} = findUser
    console.log(name,age,email)
}
// console.log(userDestructure(users,3))

//Create a new array that includes an additional user object with id: 5, name: "Eva Green," age: 28, and email: "eva@example.com" using array spreading.
function newAdditionArray(array){
    const userNew ={
        id: 6, name: "Eva 2", age: 28,email: "eva2@example.com"
    }
    const newArray = [...array,userNew]
    return newArray
}
// console.log(newAdditionArray(users))

//Find and return the user with the email address "bob@example.com" from the users array.
function findAndReturnUser(array,email){
    const user = array.find(user => user.email === email)
    console.log(user)
    return user
}
// console.log(findAndReturnUser(users,'bob@example.com'))

//Calculate the total age of all users in the users array using the reduce method.
function calculateAge(array){
    const totalAge = array.reduce((sum,user) =>{
       return user.age + sum
    },0)
    return totalAge
}
// console.log(calculateAge(users))

//Create a new array that includes only the names of users from the users array.
function newIncludeArray(array){
    const newArray = array.map(user => user.name)
    return newArray
}
console.log(newIncludeArray(users))


// Create a function to calculate the average length of user names in the users array.
// Write a function to find the average age of users in the users array.
// Find the user with the maximum age in the users array.
// Check if all users have an email address in the users array.
// Calculate the total number of characters in all user names in the users array.
// Group users by their age in the users array.
// Combine the names of all users into a single string separated by commas.

