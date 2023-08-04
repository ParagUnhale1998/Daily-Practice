import React, { useState } from 'react'

export default function TodoItem(props) {
    const [complete , setComplete] = useState(false)
    
    function handleClick(){
        setComplete((prevValue) => {
            return !prevValue
        })
    }
  return <div onClick={handleClick}> 
  <li style={{ textDecoration:complete ?"line-through" : "none"}}>{props.text}</li>
  </div>
}
