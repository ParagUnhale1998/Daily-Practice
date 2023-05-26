import React, { useState } from 'react'

export default function App() {
    const [name,setname] = useState("Parag")
    // const [color,setcolor] = useState("")
    const [mouseover,setmouseover] = useState(false)
  function handleClick(){
    setname("Sanket")
  }
  
  function handleover(){
    // setcolor("lightblue")
    setmouseover(true)
  }
  function handLeave(){
    // setcolor("#01cf19")
    setmouseover(false)
  }
  return (
    <div className='container'>
        <h1>Hello {name}</h1>
        <input type="text" placeholder="what's Your Name" style={{width:"40%",margin:"2% 0%"}}/>
        {/* <button style={{background:color}} onClick={handleClick} onMouseOver={handleover} onMouseLeave={handLeave}>Submit</button> */}
        <button style={{backgroundColor:mouseover ? "lightblue" : "#01cf19"}} onClick={handleClick} onMouseOver={handleover} onMouseLeave={handLeave}>Submit</button>
    </div>
  )
}
