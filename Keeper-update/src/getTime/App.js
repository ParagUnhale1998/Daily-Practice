import React, { useState } from 'react'

export default function App() {

    const now =  new Date().toLocaleTimeString();
    const [time , setTime] = useState(now)
    function updateTime(){
        const newTime =  new Date().toLocaleTimeString();
        setTime(newTime)
    }

    setInterval(updateTime(),1000)
  return (
    <div>
      <h1>{time}</h1>
      <button onClick={updateTime()}>Get Time</button>
    </div>
  )
}
