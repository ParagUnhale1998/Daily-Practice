import React, { useEffect, useState } from "react";

export default function EventsMouse() {
  const [message, setMessage] = useState("");
  const [keybordValue, setkeybordValue] = useState("");
  const [scrollDirection, setScrollDirection] = useState(null);
  const [formMessage, setformMessage] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setMessage("window has been resize");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      setkeybordValue(`Key "${event.key}" has been pressed`);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      console.log("Page has been scrolled");
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > 0) {
        setScrollDirection(scrollTop);
      } else {
        setScrollDirection(scrollTop);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
 const handleFormSubmit = (event) => {

      event.preventDefault();
      setformMessage('Form Has Been Submited')
    }

    const form = document.querySelector('form')
    form.addEventListener('submit',handleFormSubmit)

    return () => {
        form.removeEventListener('submit',handleFormSubmit)
    }
  })
  
  return (
    <div className="container">
    <div className="container">
      <h1>Window Resize Listener</h1>
      <p>{message}</p>
      </div>
      <div className="container">
      <h2>Keyboard Event Listener</h2>
      <h4>{keybordValue}</h4>
      </div>
      <div className="container">
      <h2>Scroll Event Listener</h2>
      <h4>Scroll Direction:{scrollDirection}</h4>
      </div>
      <div className="container">
        <h1>Form Submit Event Listener</h1>
        <form action="">
            <input type="text" value={"Parag"}/>
            <button type="submit">Submit</button>
        </form>
        <h4>{formMessage}</h4>
      </div>
    </div>
  );
}
