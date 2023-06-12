import React from "react";
import "./Style.css";

export default function Video(props) {
  return (
    <div className="container">
      <h2>{props.title}</h2>
      <p>{props.views}</p>
      <button
        className="delete"
        // onClick={() => props.deleteVideos(props.id)}
        // using reducerHooks
        onClick={() => props.dispatch({type:'DELETE',payload:props.id})}
      >
        Delete
      </button>
      <button
        className="edit"
        onClick={() => props.editVideo(props.id, props.index)}
      >
        Edit
      </button>
    </div>
  );
}
