import React,{useState} from 'react'



const root = ReactDOM.createRoot(document.getElementById('root'));

export default function App() {
    
    function increase() {
        count++
    }

    return (
        root.render(
            <React.StrictMode>
                <div className='container'>
                    <h1>{count}</h1>
                    <button onClick={increase()}>+</button>
                </div>
            </React.StrictMode>
        )

    )
}
