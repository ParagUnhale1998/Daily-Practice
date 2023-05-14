// import React from 'react'
import Cardlist from './Cardlist';
 import { robots } from './robots';
import Searchbox from './Searchbox';
 import React, { Component } from 'react'
 
 export class App extends Component {
     constructor(){
        super()
        this.state = {
            robots: robots,
            searchfield: ""
        }
     }

     onSearchChange = (event) => {
    //   console.log(event.target.value)
    this.setState({searchfield: event.target.value})
   
     }

   render() {
    const filteredRobots = this.state.robots.filter(robots => {
        return robots.firstName.toLowerCase().includes(this.state.searchfield.toLowerCase());
    })
     return (
       <div className='tc'>
           <h1 >RoboFriends</h1>
           <Searchbox searchChange = {this.onSearchChange}/>
           <Cardlist robots ={filteredRobots}/>
           {/* <Cardlist robots ={this.state.robots}/> */}
       </div>
     )
   }
 }
 
 export default App
 
//  const App = () => {
//   return (
//     <div className='tc'>
//         <h1 >RoboFriends</h1>
//         <Searchbox/>
//         <Cardlist robots ={robots}/>
//     </div>
//   )
// }
// export default App