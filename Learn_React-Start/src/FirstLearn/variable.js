// old version 
// const React = require('react')
// const ReactDOM = require('react-dom')

//new version
import React from "react";
import ReactDOM from "react-dom";

var img = "https://picsum.photos/200";
ReactDOM.render(
  <div className="container">
   <h1 contentEditable="true">My Favourite Food </h1>
    <img src={img + "?food"} alt="" />
    <img src={img + "?traavel"} alt="" />
    <img src={img + "?city"} alt="" />
   </div>,
  document.getElementById('root')
)