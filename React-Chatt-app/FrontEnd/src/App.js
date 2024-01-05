import './App.css';
// import {BrowserRouter as Router,Route} from "react-router-dom"
import { Routes, Route } from "react-router-dom";
import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'



function App() {

  return (
    // <div className='h-screen w-screen flex items-center justify-center'>
    // <Routes>
    // <Route exact path='/' Component={Join} />
    //   <Route path='chat' Component={Chat}/>
    // </Routes>
    // </div>
    <div className='h-screen w-screen flex items-center justify-center'>
  <Routes>
    <Route exact path='/' element={<Join />} />
    <Route path='chat' element={<Chat />} />
  </Routes>
</div>

  );
}

export default App;
