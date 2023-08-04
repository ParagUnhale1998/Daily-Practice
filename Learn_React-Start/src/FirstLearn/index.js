// old version 
// const React = require('react')
// const ReactDOM = require('react-dom')

//new version
import React from "react";
import ReactDOM from "react-dom";

const date = new Date()
const currentTime = date.getHours();
console.log(currentTime)

let greeting;
let color;
if(currentTime < 12) {
  greeting = "Good Morning"
  color = {
    color : "rgb(255, 102, 50)",
    // backgroundImage:`linear-gradient(60deg,rgb(255, 164, 103),rgb(255, 141, 234))`
  }
}else if(currentTime < 18 ){
  greeting = "Good Afternoon"
  color = {
    color : "green",
        // backgroundImage: `linear-gradient(60deg,rgb(86, 255, 86),rgba(0, 251, 184, 0.814))`

  }
}else{
  greeting = "Good Night"
  color = {
    color : "rgb(27, 175, 255)",
    // backgroundImage: `linear-gradient(60deg,rgb(86, 255, 232),rgba(0, 54, 251, 0.814))`

  }
}
ReactDOM.render(
  <h1 style={color}>{greeting}</h1>,
  document.getElementById('root')
)