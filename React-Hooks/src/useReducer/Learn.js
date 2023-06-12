import React, { useContext, useReducer, useState } from "react";
import AddVideo from "./AddVideo";
import "./Style.css";
import Video from "./Video";
import videoDB from "./videoDB";
import TheamContext from "../useContext/TheamContext";

export default function Learn() {

  // function videoReducer(state,action) {
  function videoReducer(videos, action) {
    switch (action.type) {
      case "ADD":
        return [...videos, { ...action.payload, id: videos.length + 1 }]
      case "DELETE":
        return videos.filter((video) => video.id !== action.payload)
      case "UPDATE":
        const index = videos.findIndex(v => v.id === action.payload.id)
        const updatedVideos = [...videos];
        updatedVideos.splice(index, 1, action.payload)

        updatedVideos[editableVideo.index] = action.payload;
        return (updatedVideos);
      default:
        return videos
    }
  }

  const [videos, dispatch] = useReducer(videoReducer, videoDB)

  const theamContext =  useContext(TheamContext)
  const [editableVideo, setEditableVideo] = useState(null);

  function editVideo(id, index) {
    setEditableVideo({ ...videos[index], index });
  }
  return (

    <div className={`main-container ${theamContext}  `}>
      <AddVideo
        dispatch={dispatch}
        editableVideo={editableVideo}
      />
      <div className="item-container">
        {videos.map((video, index) => (
          <Video
            key={video.id}
            id={video.id}
            title={video.title}
            views={video.views}
            editVideo={editVideo}
            dispatch={dispatch}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
