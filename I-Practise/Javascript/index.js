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
// console.log(newIncludeArray(users))


// Create a function to calculate the average length of user names in the users array.
function calculateAverageLength(array){
    totalNameLength = array.reduce((sum,user) => {
    return sum + user.name.length
    },0)
      const averageNameLength = totalNameLength / array.length;
  return averageNameLength;
}
// console.log(calculateAverageLength(users))

// Write a function to find the average age of users in the users array.
function findAverageAge(usersArray){
    const totalAge = usersArray.reduce((sum, user) => sum + user.age, 0);
    const averageAge = totalAge / usersArray.length;
  
    return averageAge;
}
// console.log(findAverageAge(users))

// Find the user with the maximum age in the users array.
function maximumAge(array){
    const maxAgeUser = array.reduce((maxUser,CurrUser) => {
        return CurrUser.age > maxUser.age ? CurrUser : maxUser;
    },array[0])
    return maxAgeUser
}
// console.log(maximumAge(users))

// Check if all users have an email address in the users array.
function checkEmail(array){
   const Checkemail =  array.every(user => user.email !== undefined && user.email !== null)
   const Checkallemail =  array.map(user => user.email !== undefined && user.email !== null)
   const userNotHaveEmail = array.filter(user => !user.email);
   return userNotHaveEmail 
}
// console.log(checkEmail(users))

// Calculate the total number of characters in all user names in the users array.
function totalCharacters(array){
    const totalNameCharacters = array.map(user => user.name.length).reduce((sum,user)=> sum + user,0)
    const totalCharacters = array.reduce((sum, user) => sum + user.name.length, 0);

    return totalCharacters
}
// console.log(totalCharacters(users))

// Group users by their age in the users array.
function groupUserByAge(array){
   const userAgeArray = users.map(user => user.age )
   return userAgeArray
   const groupedByAge = array.reduce((result, user) => {
    const { age } = user;
    result[age] = result[age] || [];
    result[age].push(user);
    return result;
  }, {});

  return groupedByAge;
}
// console.log(groupUserByAge(users))

// Combine the names of all users into a single string separated by commas.
function combineNameString(array){
   const allUsernames =  array.map(user => user.name).join(', ')
   return allUsernames 
}
// console.log(combineNameString(users))


//String Questions
    var stringObject = "{'country':'Canada','state':'British Columbia','nexus':'Canada - British Columbia','registration':'1000-2733','taxCode':'CA_GST'}";
// How would you convert the given string into a JavaScript object?
function convertStrIntoObject(str){
    var correctedString = str.replace(/'/g, '"');
    return JSON.parse(correctedString)
}
// console.log(convertStrIntoObject(stringObject))
// Can you access the value of the 'state' property in the object?
function accessState(str){
    var correctedString = str.replace(/'/g, '"');
    var parsedObject = JSON.parse(correctedString);
    var stateValue = parsedObject.state;
     return stateValue
}
// console.log(accessState(stringObject))
// What method can you use to check if the 'registration' property exists in the object?
  function checkRegistration(){
    const registration  = stringObject.includes('state')
    return registration
  }
//   console.log(checkRegistration())
// How do you update the value of the 'taxCode' property to 'CA_PST'?
 function updateValues(str){
    var correctedString = str.replace(/'/g, '"');
    var parsedObject = JSON.parse(correctedString);
    parsedObject.taxCode = 'CA_PST';
    return parsedObject
}
//  console.log(updateValues(stringObject))
// Write a code snippet to extract all the keys from the object and store them in an array.
function getKeys(str){
    var correctedString = str.replace(/'/g, '"');
    var parsedObject = JSON.parse(correctedString);
    var keysArray = Object.keys(parsedObject);
    
    return keysArray
}
// console.log(getKeys(stringObject))
// Explain the purpose of using single quotes in the string and how it might affect parsing as compared to double quotes.
// How would you check the length of the string?
// console.log(stringObject.length)
// What function can you use to validate if the string is a valid JSON format?
try {
    var parsedObject = JSON.parse(stringObject);
    // console.log("The string is a valid JSON format.");
  } catch (error) {
    // console.error("The string is not a valid JSON format:", error.message);
  }
// Write a function to stringify the object back into a JSON-formatted string.
// How can you check if the 'country' property is equal to 'Canada'?
function checkProperty(){
    var jsonObject = JSON.parse(stringObject.replace(/'/g, '"'));
// Check if the 'country' property is equal to 'Canada'
if (jsonObject.country === 'Canada') {
    console.log('The country is Canada!');
  } else {
    console.log('The country is not Canada.');
  }
}
// console.log(checkProperty())
// Now, let's move on to some advanced questions:
// Advanced Questions:
// Implement a deep clone function for the given object, ensuring that the original and cloned objects are not linked.
function deepClone(){
    var jsonObject = JSON.parse(stringObject.replace(/'/g, '"'));
    var newClone = {...jsonObject}
    console.log(jsonObject)
    return newClone
}
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map(deepClone);
    }
    return { ...obj, ...Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, deepClone(value)])) };
  }  
// console.log(deepClone())
// Create a function that dynamically adds a new key-value pair to the object based on user input.
function addData(str){
    var jsonObject = JSON.parse(str.replace(/'/g, '"'));
     const  name='parag'
    const obj ={ ...jsonObject,name}
         
    return obj
}
function addKeyValuePairToObject(obj, key, value) {
    // Parse the string into a JavaScript object
    var jsonObject = JSON.parse(obj.replace(/'/g, '"'));

    // Add the new key-value pair
    jsonObject[key] = value;

    return jsonObject;
}
// console.log(addKeyValuePairToObject(stringObject, 'classs', '12'));
var stringObject = "{'country':'Canada','state':'British Columbia','nexus':'Canada - British Columbia','registration':'1000-2733','taxCode':'CA_GST'}";
// Extract the substring from the 10th to the 20th character in the string.
var extractedSubstring = stringObject.substring(9, 19);
// Convert the entire string to uppercase.
var uppercaseString = stringObject.toUpperCase();
// Concatenate the value of "state" with the value of "country" and store it in a new variable.
function concate(str){
    var jsonObject = JSON.parse(str.replace(/'/g, '"'));
    var concatenatedValue = jsonObject.state + jsonObject.country;
    return concatenatedValue
}
// console.log(concate(stringObject))
// Write a function to remove all spaces from the string.
 stringObject.replace(/\s/g, '');
// Extract all key-value pairs from the string and store them in an array.
function keyValue(str){
    const jsonObject = JSON.parse(str.replace(/'/g, '"'));
    const keyValuePairs = Object.entries(jsonObject).map(([key, value]) => ({ key, value }));
    return keyValuePairs
}
// console.log(keyValue(stringObject));
// Determine if the string contains only alphanumeric characters.
const isAlphanumeric = /^[a-zA-Z0-9]+$/.test(stringObject);
// console.log(isAlphanumeric);
// Reverse the characters in the string.
function revestring(){
const reversedString = stringObject.split('').reverse().join('');
// console.log(reversedString);
let reversedStrings = '';
for (let i = stringObject.length - 1; i >= 0; i--) {
  reversedStrings += originalString[i];
}
}
// Replace the value for the key "registration" with a new value.
function registrations() {
    let jsonObject = JSON.parse(stringObject.replace(/'/g, '"'));
    const newRegistrationValue = '2022-4567';
    jsonObject = { ...jsonObject, registration: newRegistrationValue };
    return jsonObject
}
// console.log(registrations())
// Compare the original string with a modified version that has "Canada" replaced with "USA.
const modifiedString = originalString.replace('Canada', 'USA');
const isSame = originalString === modifiedString;
console.log(isSame);
// Substitute all occurrences of the letter 'a' with 'X' in the string.
const modifiedStrings = originalString.replace(/a/g, 'X');
// Extract and concatenate all numeric characters from the string.
const numericCharacters = originalString.match(/\d/g).join('');
// Split the string into an array using the comma as a delimiter.
const stringArray = originalString.split(',');
// Extract All Instances of "Canada"
const canadaMatches = originalString.match(/Canada/g);
// Convert to Array
const stringArrays= originalString.split(/,|:/);
// Convert to Object
const jsonString = originalString.replace(/'/g, '"');
const jsonObject = JSON.parse(jsonString);
// Replace "state" with Something
const jsonObjects = originalString.replace(/'/g, '"');
jsonObjects.state = 'Something';
// Remove "registration"
delete jsonObjects.registration;
// Create Array
const keyValueArray = Object.entries(jsonObject).map(([key, value]) => ({ key, value }));
