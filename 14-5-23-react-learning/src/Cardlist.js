import React from "react";
// import { robots } from './robots';
import Card from './Cards';

const Cardlist = ({robots}) => {
    const cardComponants = robots.map((user,i) => {
        // console.log(user)
        return (
            <Card 
            key = {i} 
            id={robots[i].id} 
            // use this or this
            // id={user.id}
            name={robots[i].firstName}  
            email={robots[i].email} />
        )  ;

    })
    return  (
        <div>
            {cardComponants}
        </div>
    )
}
export default Cardlist;
// const Cardlist = () => {
 
//   return (

//     <div>
//     <h1 className='tc'>RoboFriends</h1>
//   <Card id={robots[0].id} name={robots[0].firstName}  email={robots[0].email} />
//   <Card id={robots[1].id} name={robots[1].firstName}  email={robots[1].email}/>
//   <Card id={robots[2].id} name={robots[2].firstName}  email={robots[2].email}/>
//   <Card id={robots[3].id} name={robots[3].firstName}  email={robots[3].email}/>
//   <Card id={robots[4].id} name={robots[4].firstName}  email={robots[4].email}/>
//   <Card id={robots[5].id} name={robots[5].firstName}  email={robots[5].email}/>
//   <Card id={robots[6].id} name={robots[6].firstName}  email={robots[5].email}/>
//   </div>
//   )
// }
// export default Cardlist;
