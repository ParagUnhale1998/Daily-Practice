import React, { useState } from 'react'

export default function Email() {
    const [contact,setContact] = useState({
        fname:"",
        lname:"",
        email:""
    })

    function handleChange(event){
        const {value,name} = event.target;

    setContact((prevValue) => {

        if(name === "fname"){
           return {
            fname:value,
            lname:prevValue.lname,
            email:prevValue.email
           }

        }
        else if (name === "lname"){
            return {
                fname:prevValue.fname,
                lname:value,
                email:prevValue.email
            }
        }else if (name === "email"){
             return {
                fname:prevValue.fname,
                lname:prevValue.lname,
                email:value
             }
        }
    })

    }
  return (
    <div className='container'> 
    <h1>hello {contact.fname} {contact.lname}</h1>
    <p>{contact.email}</p>
    <form className='formevent'>
        <input onChange={handleChange} name='fname' type="text" placeholder='First name' value={contact.fname}/>
        <input onChange={handleChange} name='lname' type="text" placeholder='Last Name' value={contact.lname}/>
        <input onChange={handleChange} name='email' type="email" placeholder='Enter Email' value={contact.email}/>
        <button type='submit'>Submit</button>
    </form>
      
    </div>
  )
}
