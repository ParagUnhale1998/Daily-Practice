import React from 'react'
import Input from './Input'

export default function Login() {
  return (
    <form className="form">
        <Input type="text" placeholder="Username"/>
        <Input type="password" placeholder="Password"/> 
        {/* <Input type="password" placeholder="Confirm Password"/>  */}
    <button type='submit'>Login</button>
    {/* <button type='submit'>Register</button> */}
</form>
  )
}
