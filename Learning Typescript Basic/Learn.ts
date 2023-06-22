// First Install Npm Install Typescript --save-dev and then Create Ts FIle 
// to run typescript in terminal type npx tsc learn.ts after run this code create same name javascript file like learn.js file 

// Type annotations
// type annotations are a way to describe  the data in our application
// we can annotate variables, functions , arrays , objects .

// function 
 
function addShipping1(price : number,shipping: number){ // we can not use other datatype than number
    console.log(price+shipping)
}
//addShipping('10',3)  we can not use other datatype 
addShipping1(10,3)

function addShipping2(price : number,shipping: number): number{ // This function only allow a number 
    return price+shipping
  //  return "test"  this not allowed in function that define number dataytype beaceuse this test is string value
}
addShipping2(12,3)

//----------------------------------------------------------------------------------------------------------------------------

// Variables 
//define variables in typescript
// string , boolean , number , null , undefined , any //this datatypes are supported in typescript

let myName :string = 'parag' ;
// myName = 5 ; this is error we can not assign defferent datatype values

let fname = ""; // this automatic dettect the datatype  
//fname = 5;  this is error we can not assign defferent datatype values

// use Any dataType / when you dont know which type of value come from other sides
let lname; // if we no define value or datatype then the variale automatic set the datatype to any datatypes
lname = "Unhale"

let parag!:any;  // this is ! optionnal symbole we can use the property later 
//----------------------------------------------------------------------------------------------------------------------------

// union Tyoes

// a union types is a multiple use of datatype ot assign a variables
let uniontype : string | number | null = null;
uniontype = "Working"
// advantage of union type we can use in functions,return values,arrays,and objects

function addShipping3(price : number,shipping: number): number | boolean{ 
    return price+shipping
}
addShipping3(12,3)


// Arrays

let items = ['speaker','laptop','mouse'] // this automaticle set to Sting of array
let itemss = [] // this set to any datatype array
let num : number[] = [1,3,4,5,6,4] // this is correct way to assign a datatype to array
let numString  : number[] | string   = [] // this only allowed a number array to not string 
let numStrings : number[] | string[] = [] // this is correct way to to store number and string in array
let mixitem = [1,'laptop'] // this items is automatic set to number and string if we hover on mixitem

//----------------------------------------------------------------------------------------------------------------------------

// Objects

let account1 = { // if we hover the account object this show the string and number datatype 
    name : 'parag Unhale',
    sallary : 1000000
}

// the syntax of annotating a objects is 

let account2: {
    name : string,
    sallary : number,
    status?: string // this is optional property ? this is optional symbol in object
} = {
    name : 'parag Unhale',
    sallary : 1000000
}

// let accounts : {}[]; // this syntax store the array of objects 

//----------------------------------------------------------------------------------------------------------------------------

// Interfaces
// for create types for objects / the Interface keyword allow is to create a custom type of a object
// most devloper use the captical case to interfaceing the name 
// it helps other devloper to identify the interfaces
// they dont get compiled in javascript
// interface we completly abbsunt from our javascript file
// objects have methods  like functions
//Void type is a special type of a functions
// when you dont want to return a value from functinon in this case we use Void 


interface IAccount {
    name : string,
    sallary : number,
    status?: string ,
    deposite? : () => void
};

let account : IAccount = {
    name : 'parag Unhale',
    sallary : 1000000
}
let accounts :IAccount[]; // the syntac we tell a typescrit to we have an array of accounts

//----------------------------------------------------------------------------------------------------------------------------

// Classes 

class InvestmentAccounts implements IAccount { // this keyword it tell typescript to we adding interface to class 

  constructor(public name:string, public sallary:number){ // we can use everywhere using public keyword
     
  }

  private withdraw(){  // we can private the proerty or function 

  }
}

//----------------------------------------------------------------------------------------------------------------------------

// generics

// the allow functionn to strict and flexible in angular 
// a generics is a placeholder for datatypes like <T> most devloper use T for Types
// we can use any name istand of T

class Queue <T>{ // this t is represent any datatype // we can use anywhere in class
    private data: T[] = []; 
    
    add(item:T){// this method accept the argument of item
         // if this T generics is set to string the the itms is restricted to string 
        this.data.push(item);
    };

    remove(){
        this.data.shift() ;
    }

}

const nameQueue = new Queue<string>(); // we send the string datatype to generics to add function 
nameQueue.add('parag') 
nameQueue.add('unhale')

const numberQueue = new Queue<number>();// we send the number datatype to generics to add function 
numberQueue.add(20)


// generics use in functinos 

function somegenerics<T>(a:T):T{
    return a
}
somegenerics('parag')

//----------------------------------------------------------------------------------------------------------------------------

// Decorators 

// we can use babel and typescript 
// decorators are functions for extending business logic or adding metadata
// decorator is like decorating a house or cristmus tree etc
// they allows us to modified the existing the code 
// we return the same piece of code but with the modifications

//avoiding the duplicate code 
// we can use HOC == high order components , Composition , CLosures , MIXIns
// advantages of decorators we can apply then to classes, properrtys, methods, accessers and parameters

// to create decoreator type npx tsc --init
// the typescript create tsconfig.json file

function menuItem(value) {
    return class extends value {
        id  = 'abc'
    };
}


@menuItem
class Pizza{
    id : string;
}
class burger {
    id :string;
}

console.log(new Pizza().id)

// using closers
function menuitemFunction(itemid:string){ // in outer functinos we can accept data parametere
    return function(value){ // inner fucntion we be responsible for inner acting for target 
        return class extends value {
            // id = 'ABC'
            id =  itemid 
        }
    }
}

// both class has an id set by decorators
@menuitemFunction("ABC")
class Pizzas{
    id : string;
}

@menuitemFunction("XYZ")
// only use top of the class 
class burgers {
    id :string;
}
console.log(new Pizzas().id)