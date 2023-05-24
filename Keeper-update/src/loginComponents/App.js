import React from 'react'
// import Login from './Login';
import Form from './Form';
// var isLoggedIn = false;
var userisRegistered = false;

// function renderConditionally() {
//     if (isLoggedIn === true) {
//         return 
//     } else {
//         return <Login/>
//     }
// }
export default function App() {
    return (
        <div className='container'>
            {/* ternary operator */}
        {/* {isLoggedIn ===true ? <h1>hello</h1> : <Login/>} */}
        {/* {userisRegistered === true ? <Login isRegistered={userisRegistered}/> : <Form isRegistered={userisRegistered}/>} */}
        <Form isRegistered={userisRegistered}/>
        </div>
    )
}
