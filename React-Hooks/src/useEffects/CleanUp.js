import React, { useState, useEffect } from 'react';

const CleanUp = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Update the document title with the current count
    document.title = `Count: ${count}`;

    // Clean up function
    return () => {
      // Reset the document title when the component is unmounted
      document.title = 'React App';
    };
  }, [count]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Counter</h1>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
};

export default CleanUp;
