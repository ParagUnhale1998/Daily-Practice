import React, { useState } from 'react'

export default function Form() {
    /*  const [fname,setfname] = useState("")
      const [lname,setlname] = useState("")
    
      function handleFname(event){
          const firstname = event.target.value;
          setfname(firstname)
      }
  
      function handlelLname(event){
          const lastName = event.target.value;
          setlname(lastName)
      }*/

    // for similar and mode funciton we use objects 
    const [fullName, setFullname] = useState({
        fname: "",
        lname: ""
    })

    function handleChange(event) {
        // const newValue = event.target.value;
        // const inputName = event.target.name;
        
        const {value,name} = event.target

        setFullname((prevValue) => {
            // if(inputName === "fname"){
            if(name === "fname"){
                return {
                    // fname: newValue,
                    fname: value,
                    lname: prevValue.lname
                }
            }else{
                return{
                    fname: prevValue.fname,
                    lname: value
                    // lname: newValue
                }
            }
        })
    }
    return (
        <div className='container'>
            <h1>hello {fullName.fname} {fullName.lname}</h1>
            <form onSubmit="" className='formevent'>
                {/* <input name='fname' type="text" onChange={handleChange} placeholder='First Namew' value={fname}/> */}
                {/* <input name='lname' type="text" onChange={handleChange} placeholder='Last Name' value={lname}/> */}
                <input name='fname' type="text" onChange={handleChange} placeholder='First Namew' value={fullName.fname}/>
                <input name='lname' type="text" onChange={handleChange} placeholder='Last Name' value={fullName.lname}/>
                <button>Submit</button>
            </form>

        </div>
    )
}
