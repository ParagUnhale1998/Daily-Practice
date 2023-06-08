import React, { useEffect, useState } from 'react'

export default function DataFetching() {
   const [data , setdata] = useState([])

   useEffect(() => {
    const fetchData = async () => {
        try{
            const response =  await fetch('https://jsonplaceholder.typicode.com/users')
            const fakeData  = await response.json()
            console.log(fakeData)
            setdata(fakeData)
        } catch (error) {
            console.log(error)
        }
    }
    fetchData()
   },[])

  return (
    <div className='container'>
      <h1>Data Fetching Using Use Effects</h1>
      <ul>
        {
            data.map((item) =>{
                return <li key={item.id}>{item.name}</li>

            })
        }
      </ul>
    </div>
  )
}
