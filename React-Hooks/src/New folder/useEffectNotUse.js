import React, { useState } from "react";
import "./Style.css";

const emptyState = {
  id: "",
  title: "",
  views: ""
};

export default function AddVideo({ addVideos, updateVideos, editableVideo }) {
  const [video, setVideo] = useState(emptyState);
  const [isEditing, setIsEditing] = useState(false);

  if (editableVideo && !isEditing) {
    setVideo(editableVideo);
    setIsEditing(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isEditing) {
      updateVideos(video);
      setIsEditing(false);
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
      <button onClick={handleSubmit}>
        {isEditing ? "Save Edit" : "Submit"}
      </button>
    </form>
  );
}
