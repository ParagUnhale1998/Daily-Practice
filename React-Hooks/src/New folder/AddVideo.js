import React, { useContext, useEffect, useRef, useState } from "react";
import "./Style.css";
import videoDispatchContext from "../useContext/VideoDispatch";

const emptyState = {
  id: "",
  title: "",
  views: ""
};

export default function AddVideo({ editableVideo }) {


  const [video, setVideo] = useState(emptyState);
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useContext(videoDispatchContext)
  const inputRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault();
    if (editableVideo) {
      dispatch({ type: "UPDATE", payload: video })
      setIsEditing(false)
    } else {
      dispatch({ type: "ADD", payload: video })
    }
    setVideo(emptyState);

  }
  useEffect(() => {
    function textChange() {
      inputRef.current.placeholder = ""
      "Add Video Title".split("").forEach((char, index) => {
        setTimeout(() => {
          inputRef.current.placeholder = inputRef.current.placeholder + char
        }, 200 * index);
      })
    }
    window.addEventListener("onload", textChange);
    return window.removeEventListener("onload", textChange);    

  }, [])



  function handleOnChange(e) {
    const { name, value } = e.target;
    setVideo((prevVideo) => ({
      ...prevVideo,
      [name]: value
    }));
  }

  useEffect(() => {
    if (editableVideo) {
      setVideo(editableVideo);
      setIsEditing(true)
      // inputRef.current.focus();

      // inputRef.current.placeholder = ""
    }
  }, [editableVideo]);

  return (
    <form>
      <h1>Create a Video Details</h1>
      <input
        ref={inputRef}
        type="text"
        name="title"
        onChange={handleOnChange}
        placeholder="Video Title"
        value={video.title}
      />
      <input
        type="text"
        name="views"
        onChange={handleOnChange}
        placeholder="Views"
        value={video.views}
      />
      <button onClick={handleSubmit}>{isEditing ? "Save Edit" : "Submit"}</button>
    </form>
  );
}

/*
import React, { useEffect, useState } from "react";
import "./Style.css";

const emptyState = {
  id: "",
  title: "",
  views: ""
};

export default function AddVideo({ addVideos, updateVideos, editableVideo }) {
  const [video, setVideo] = useState(emptyState);
  const [ isEditing , setIsEditing] = useState(false)


  function handleSubmit(e) {
    e.preventDefault();
    if (editableVideo) {
      updateVideos(video);
      setIsEditing(false)
    } else {
      addVideos(video);
    }
    setVideo(emptyState);
  }

  function handleOnChange(e) {
    const { name, value } = e.target;
    setVideo((prevVideo) => ({
      ...prevVideo,
      [name]: value
    }));
  }

  useEffect(() => {
    if (editableVideo) {
      setVideo(editableVideo);
      setIsEditing(true)
    }
  }, [editableVideo]);

  return (
    <form>
      <h1>Create a Video Details</h1>
      <input
        type="text"
        name="title"
        onChange={handleOnChange}
        placeholder="Video Title"
        value={video.title}
      />
      <input
        type="text"
        name="views"
        onChange={handleOnChange}
        placeholder="Views"
        value={video.views}
      />
      <button onClick={handleSubmit}>{isEditing ? "Save Edit" : "Submit"}</button>
    </form>
  );
}
*/