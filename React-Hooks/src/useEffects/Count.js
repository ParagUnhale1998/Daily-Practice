import React, { useState } from 'react'

export default function Count() {

    const [ count ,  setCount ] = useState(0)

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        setCount(count - 1)
    }
    const reset = () => {
        setCount(0)
    }
  return (
    <div className='container'>
      <h1>Learning Use State </h1>
      <p>count : {count}</p>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}
