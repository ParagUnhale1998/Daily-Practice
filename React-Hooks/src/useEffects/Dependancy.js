import React, { useEffect, useState } from 'react'

export default function Dependancy() {
    const [count, setCount] = useState(0)
    const [message, setMessage] = useState(null)

    // Dependency on a Variable:
    useEffect(() => {
        setMessage(`The Count Is ${count}`)
        // This effect will only run when the count is an even number
        // if (count % 2 === 0) {
        //     setMessage(`The count is ${count}`);
        //   }
    }, [count])

    const handleIncrement = () => {
        setCount(count + 1)
    }

    //Dependency on Multiple Variables:
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        setFullName(`${firstName} ${lastName}`)
    }, [firstName, lastName])


    //Empty Dependency Array (Run Once):

    const [singleMessage, setSingleMessage] = useState('');

    useEffect(() => {
        setSingleMessage('Welcome to UseEffect')
    }, [])


    //different example that demonstrates how to control when the effect should run and avoid unnecessary re-renders:

    const [isLogginIN, setisLogginIN] = useState(false)
    const [userStatus, setuserStatus] = useState(null)

    useEffect(() => {
        const handleStatus = () => {

            setuserStatus("Welcome To React");
        }

        if (isLogginIN) {
            handleStatus()
        } else {
            setuserStatus("Login To Enter")
        }

    }, [isLogginIN])

    const handleLogin = () => {
        setisLogginIN(true)
    }

    const handleLogout = () => {
        setisLogginIN(false)
    }
    return (
        <div className='container'>
            <div className='container'>
                <h3>Dependency on a Variable:</h3>
                <p>{message}</p>
                <button onClick={handleIncrement}>Increment +</button>
            </div>
            <div className='container'>
                <h3>Dependency on Multiple Variables</h3>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <p>{fullName}</p>
            </div>
            <div className="container">
                <h3>Empty Dependency Array (Run Once):</h3>
                <h4>{singleMessage}</h4>
            </div>
            <div  className="container">
                <p>{userStatus}</p>
                {isLogginIN ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <button onClick={handleLogin}>Login</button>
                )}
            </div>
        </div>
    )
}
