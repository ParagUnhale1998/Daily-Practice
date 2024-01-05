import React, { useState } from "react";
import { Link } from "react-router-dom";

let user;
export default function Join() {
  const sendUser = () => {
    user = document.getElementById("input").value;
    // console.log(user)
    document.getElementById("input").value = "";
  };

  const [name, setName] = useState("");
  // console.log(name)
  return (
    //     <div className="flex border items-center justify-center ">
    //     <div className="text-center w-140 space-y-10   border border-black shadow-lg p-5">
    //         <img className="w-20 h-20 rounded-full mx-auto" src="https://e7.pngegg.com/pngimages/965/490/png-clipart-online-chat-amazon-com-livechat-app-store-android-text-logo.png" alt="" />
    //         <h1 className="text-white bg-gray-800">Chatting App</h1>
    //         <input onChange={(e) => setName(e.target.value)} type="text" id='input' className="border p-2 mt-2" />
    //         <Link to="/chat" onClick={(e) => !name ? e.preventDefault():null}>
    //             <button className="bg-white text-gray-500 p-2 mt-2" onClick={sendUser}>Login</button>
    //         </Link>
    //     </div>
    // </div>
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="text-center text-white w-full p-8">
        <img
          className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
          src="https://e7.pngegg.com/pngimages/965/490/png-clipart-online-chat-amazon-com-livechat-app-store-android-text-logo.png"
          alt=""
        />
        <h1 className="text-3xl font-bold mb-4">Welcome to ChatApp</h1>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="input"
          className="border p-3 mt-2 text-black w-full bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 ease-in-out hover:shadow-lg"
          placeholder="Enter your username"
        />
        <Link to="/chat" onClick={(e) => (!name ? e.preventDefault() : null)}>
          <button
            className="bg-red-400 rounded text-white font-bold p-3 mt-4 w-full  hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 ease-in-out hover:shadow-lg"
            onClick={sendUser}
          >
            Join Chat
          </button>
        </Link>
      </div>
    </div>
  );
}
export { user };
