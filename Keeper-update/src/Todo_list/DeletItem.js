import React from 'react'

export default function TodoItem(props) {
   
    
    function handleClick(){
       
    }
  return <div onClick={()=>{
    props.onChecked(props.id)
  }}> 
  <li>{props.text}</li>
  </div>
}
