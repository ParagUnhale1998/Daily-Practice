import React,{useState} from 'react'

/*const root = ReactDOM.createRoot(document.getElementById('root'));
export default function App() {
    // const state = React.useState();
    const state = useState();

    function increase() {
        count++
    }

    return (
        root.render(
            <React.StrictMode>
          
            </React.StrictMode>
        )

    )
}
*/

function App() {
    const [count,setCount] = useState(1)

    function increase(){
        setCount(count + 1)
    }
    function increase(){
        setCount(count - 1)
    }
    return (
        <div className='container'>
        <h1>{count}</h1>
        <button onClick={decrease()}>-</button>
        <button onClick={increase()}>+</button>
    </div>
    )
}

export default App;