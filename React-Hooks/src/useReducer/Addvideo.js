import React, { useEffect, useState } from "react";
import "./Style.css";

const emptyState = {
  id: "",
  title: "",
  views: ""
};

export default function AddVideo({ dispatch, editableVideo }) {
  const [video, setVideo] = useState(emptyState);
  const [ isEditing , setIsEditing] = useState(false)


  function handleSubmit(e) {
    e.preventDefault();
    if (editableVideo) {
      dispatch({type : "UPDATE" ,payload:video})
      setIsEditing(false)
    } else {
      dispatch({type : "ADD" ,payload:video})
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
