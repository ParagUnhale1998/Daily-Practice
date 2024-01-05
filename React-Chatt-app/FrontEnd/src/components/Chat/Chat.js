import React, { useEffect, useId, useState } from "react";
import socketIO from "socket.io-client";
import { user } from "../Join/Join";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { Link } from "react-router-dom";
let socket;
const ENDPOINT = "http://localhost:4500";
function Chat() {
  const [id, setID] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () => {
    const message = document.getElementById("chatMessages").value;
    socket.emit("message", { message, id }); //message:message or any name
    document.getElementById("chatMessages").value = "";
  };
  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      setID(socket.id);
      console.log(socket.id);
      console.log(useId);
      // alert('Socket Connected Frontned')
    });
    //send user name to backend using joined named
    //if value not same send user:username
    socket.emit("joined", { user });
    socket.on("Welcome", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data.user, data.message);
    });
    socket.on("userJoined", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data.user, data.message);
    });
    socket.on("leave", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data.user, data.message);
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  useEffect(() => {
    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  const exitChat = () => {
    window.location.href = "/";
  };
  return (
    // <div className='container border bg-white flex items-center justify-center h-1/2 w-full'>
    //     <div className="w-96 p-4 border shadow-lg">
    //         <div className="header flex justify-between text-xl font-bold mb-4">
    //             <h1>Chat Room </h1>
    //             <button className='py-2 px-4 bg-red-400 rounded shadow text-white'>Close</button>
    //         </div>
    //         <ReactScrollToBottom className="chatBox h-48  p-2 overflow-y-auto mb-4 border">
    //             {/* Chat messages go here */}
    //             {/* <Message message={'hey wats up'}/> */}
    //             {messages.map((itemData,index) =><Message user={itemData.id === id ? '' : itemData.user} message={itemData.message} classes={itemData.id === id ? 'justify-end':'justify-start'} />)}
    //         </ReactScrollToBottom>
    //         <div className="inputBox flex items-center">
    //             <input onKeyUp={(e) => e.key === 'Enter' ? send() : null}  type="text" id='chatMessages' className="flex-grow p-2 border mr-2 focus:outline-none focus:shadow-lg" placeholder="Type your message..." />
    //             <button onClick={send} className="bg-blue-500 text-white px-4 py-2 rounded hover:shadow-lg">Send</button>
    //         </div>
    //     </div>
    // </div>
    <div className="container bg-white flex flex-col h-screen">
      <div className="header flex items-center justify-between text-xl font-bold mb-4 p-4 bg-gradient-to-l from-blue-500 to-purple-500 text-white capitalize">
        <div className="flex items-center">
          <h1 className="mx-auto">Chat Room </h1>
        </div>
        <Link onClick={() => exitChat()} to="/">
          <button className="py-2 px-4 bg-red-400 rounded shadow text-white">
            Close
          </button>
        </Link>
      </div>

      <ReactScrollToBottom className="chatBox flex-grow p-4 overflow-y-auto border">
        {messages.map((itemData, index) => (
          <Message
            user={itemData.id === id ? "" : itemData.user}
            message={itemData.message}
            classes={itemData.id === id ? "justify-end" : "justify-start"}
          />
        ))}
      </ReactScrollToBottom>
      <div className="inputBox bg-gradient-to-r  from-blue-500 to-purple-500 flex items-center p-4 border-t">
        <input
          onKeyUp={(e) => (e.key === "Enter" ? send() : null)}
          type="text"
          id="chatMessages"
          className="flex-grow p-2 rounded-md border mr-2 focus:outline-none focus:shadow-lg"
          placeholder="Type your message..."
        />
        <button
          onClick={send}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:shadow-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
