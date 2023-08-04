import React from 'react'

function strike () {
    document.getElementById('root').style.textDecoration ="line-through";
}
function unstrike () {
    document.getElementById('root').style.textDecoration ="none";
}
export default function App() {
//  let isDone =  false ;
//  const strikeThrough = {textDecoraation : "line-through"}
 
//  return <p style={isDone && strikeThrough}>Buy Milk</p>
return (
    <div className='Container'>
        <p>buy milk</p>
        <button onClick={strike}>Strike</button>
        <button onClick={unstrike}>unStrike</button>
    </div>
)
}
