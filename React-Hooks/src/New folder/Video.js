import React  from "react";
import "./Style.css";
import useVideoDispatch from "../Hooks/VideoDispatch";
// import videoDispatchContext from "../useContext/VideoDispatch";

// import VideoDispatch from "../Hooks/VideoDispatch";

export default function Video(props) {
  // const dispatch = useContext(videoDispatchContext)
  const dispatch = useVideoDispatch()
  
//  VideoDispatch 
  return (
    <div className="container">
      <h2>{props.title}</h2>
      <p>{props.views}</p>
      <button
        className="delete"
        // onClick={() => props.deleteVideos(props.id)}
        // using reducerHooks
        onClick={() => dispatch({type:'DELETE',payload:props.id})}
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
