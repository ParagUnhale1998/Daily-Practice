import React, { useEffect, useState } from "react";

export default function SubscriptionToEvents() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX , y : event.clientY });
    };

      document.addEventListener('mousemove', handleMouseMove);
     
      //  is returned in the cleanup function, ensuring it is removed when the component unmounts.
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
      }
  },[]);

  return <div className="container">
        <h1>Learning useEffects Events </h1>
      <h2>Mouse position: {mousePosition.x}, {mousePosition.y}</h2>
  </div>;
}


/* imp
Returning a cleanup function in the useEffect hook is important for cleaning up any resources or event listeners that were created during the component's lifecycle. While the code may appear to work without explicitly returning the cleanup function, it's considered a best practice to include it.

Here's why returning the cleanup function is recommended:

Preventing Memory Leaks: If you don't clean up event listeners, subscriptions, or other resources when a component unmounts, it can lead to memory leaks. Returning the cleanup function ensures that the necessary cleanup actions are performed, preventing any potential memory leaks.

Avoiding Unexpected Behavior: When a component unmounts, it's possible for the cleanup code to be skipped if you don't explicitly return the cleanup function. This can result in unexpected behavior or errors in your application.

Supporting Re-rendering: In some cases, your component may re-render due to changes in props or state. If you have registered an event listener or set up a subscription inside the useEffect hook, not returning the cleanup function can lead to multiple event listeners or subscriptions being created for the same component instance.

By returning the cleanup function, you ensure that the cleanup code is executed properly whenever the component unmounts or when the dependencies specified in the useEffect dependency array change. It promotes good memory management and avoids potential issues in your React application.

*/