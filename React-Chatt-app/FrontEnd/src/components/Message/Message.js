import React from "react";

function Message({ user, message ,classes}) {
//   if (user) {
//     return (
//       <div className={` flex items-center mb-2 bg-black ${classes}`}>
//         <div className="bg-blue-500 shadow text-white py-2 px-4 rounded-lg">
//           {`${user}: ${message}`}
//         </div>
//       </div>
//     );
//   } else {
//     return (
//         <div className={` flex items-center mb-2 bg-black ${classes}`}>
//           <div className="bg-blue-500 shadow text-white py-2 px-4 rounded-lg">
//             {`You: ${message}`}
//           </div>
//         </div>
//       );
//   }
return (
    <div className={`flex items-center mb-2 ${classes}`}>
    {/* <div className={`bg-blue-500 shadow text-white py-2 px-4 rounded-lg ${user ? 'self-end bg-green-500' : 'self-start '}`}> */}
    <div className={`bg-blue-500 shadow text-white py-2 px-4 rounded-lg ${user ? 'self-end bg-green-500' : 'self-start '} ${message === 'Welcome to the chat' ? ' mx-auto bg-gradient-to-t from-blue-500 to-purple-500 text-white' : ''} ${user === 'Admin' ? 'mx-auto bg-gradient-to-t from-blue-500 to-purple-500 text-white' : ''}`}>
      
      {user === 'Admin' ? `${message}` : user ? `${user}: ${message}` : `You: ${message}`}
    </div>
  </div>
)
}

export default Message;
