import React, { useEffect, useState, useCallback } from "react";

export default function RandomColor() {
  const [backgroundColor, setBackgroundColor] = useState({
    color1: "",
    color2: ""
  });
  const [gradientDegree, setGradientDegree] = useState(0);
  const [textareaValue, setTextareaValue] = useState("");

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        // console.log(letters)
      color += letters[Math.floor(Math.random() * 16)];
    //   console.log(color)
    }
    return color;
  };

  const getRandomDegree = () => {
    const degree = Math.floor(Math.random() * 361);
    setGradientDegree(degree);
    return degree;
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      const color1 = getRandomColor();
      const color2 = getRandomColor();
      getRandomDegree();
      setBackgroundColor({ color1, color2 });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    document.body.style.background = `linear-gradient(${gradientDegree}deg, ${backgroundColor.color1}, ${backgroundColor.color2})`;
    setTextareaValue(
      `linear-gradient(${gradientDegree}deg, ${backgroundColor.color1}, ${backgroundColor.color2})`
    );
  }, [backgroundColor, gradientDegree]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(textareaValue);
  }, [textareaValue]);

  useEffect(() => {
    const handleMouseClick = () => {
      handleCopy();
    };

    document.body.addEventListener("click", handleMouseClick);

    return () => {
      document.body.removeEventListener("click", handleMouseClick);
    };
  }, [handleCopy]);

  return (
    <div className="container">
      <h1>Random Gradient Generator Using Mouse</h1>
      <textarea
        name="textarea"
        id="code-text"
        cols="40"
        rows="2"
        value={textareaValue}
        readOnly // Make textarea read-only
        placeholder="Choose The Gradient Colors"
      ></textarea>
      <h2>Click EveryWhere To Copy Gradient </h2>
    </div>
  );
}
