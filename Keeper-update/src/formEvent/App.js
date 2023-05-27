import React, { useState } from "react";

export default function App() {
  const [name, setname] = useState("");
  const [heading, setHeading] = useState("");

  function handleChange(event) {
    setname(event.target.value);
  }

  function handleClick(event) {
    setHeading(name);
    event.preventDefault();
    
  }
  return (
    <div className="container">
      <h1>Hello {heading}</h1>
      <form action="" className="formevent" onSubmit={handleClick}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="what's Your Name"
          value={name}
          style={{ width: "40%", margin: "2% 0%" }}
        />
        {/* <button  onClick={handleClick}>Submit</button> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
