import React, { useEffect, useState } from 'react'

export default function Time() {
    const [time,setTime] = useState(new Date().toLocaleTimeString())

    useEffect(()=>{
   const timer =  setInterval(() => {
            setTime(new Date().toLocaleTimeString())
        }, 1000);
        
        // best practice to remove anything or clear events for good code producitons 
        return () => {
          clearInterval(timer)
        }
    }, [])
  return (
    <div className='container'>  
           <h1> Current Time : {time}</h1>  
    </div>
  )
}
