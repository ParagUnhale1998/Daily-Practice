import React, { useCallback, useMemo, useRef, useState } from 'react'
import "./Style.css";

// fucntion is outside to awoid dependancy of fib un useMemo
// function fib(n){
//   if(n===1 || n===2) {
//     return 1
//   }
//   return fib(n-1)+fib(n-2)
// }


export default function Counter() {
    const [number,setNumber] = useState(5)
   const num = useRef(0)

    function handleClick(e) {
        e.stopPropagation();
        setNumber(number => number + 1 )
        num.current++
        console.log(num.current)
    }

    //fubunacchi series
    const fibUseCallback =  useCallback(function fib(n){
      if(n===1 || n===2) {
        return 1
      }
      return fib(n-1)+fib(n-2)
    }
  ,[])
    
   const fibMemoized = useMemo(()=>fibUseCallback(number),[number,fibUseCallback])
  return (
    <div className='container'> 
        <h3>Count :{number} </h3>
        <h3>fubonacchi Series : {fibMemoized}</h3>
        <button onClick={handleClick}>Increase</button>
    </div>
  )
}
