import React, { useEffect, useReducer, useState ,Suspense } from "react";
import AddVideo from "./AddVideo";
import "./Style.css";
import VideoContext from "../useContext/VideoContext";
import VideoDispatch from "../useContext/VideoDispatch";
import Video from "./Video";
// import videoDB from "./videoDB";
import Counter from "./Counter";
import data from "./Data.json";
import axios from "axios";
// import SuspenseComponent from "./SuspenseComponent";
export default function Learn() {

 
  // function videoReducer(state,action) {
  function videoReducer(videos, action) {
    switch (action.type) {
      case "ADD":
        return [...videos, { ...action.payload, id: videos.length + 1 }];
      case "DELETE":
        return videos.filter((video) => video.id !== action.payload);
      case "UPDATE":
        const index = videos.findIndex((v) => v.id === action.payload.id);
        const updatedVideos = [...videos];
        updatedVideos.splice(index, 1, action.payload);
        updatedVideos[editableVideo.index] = action.payload;
        return updatedVideos;
      default:
        return videos;
    }
  }

  const [videos, dispatch] = useReducer(videoReducer, data);
  // const [videos, setVideos] = useState(videoDB);
  const [editableVideo, setEditableVideo] = useState(null);
  const [showSuspense,setShowSuspense] = useState(false)
  // const Videoss = useContext(videos)
  // function addVideos(video) {
  //   dispatch({type : "ADD" ,payload:video})
  //   // setVideos([...videos, { ...video, id: videos.length + 1 }]);
  // }

  function editVideo(id, index) {
    setEditableVideo({ ...videos[index], index });
  }

  // function updateVideo(video) {
  //   dispatch({type : "UPDATE" ,payload:video})
  //   // const updatedVideos = [...videos];
  //   // updatedVideos[editableVideo.index] = video;
  //   // setVideos(updatedVideos);
  //   // setEditableVideo(null);
  // }

  // function deleteVideos(id) {
  //   dispatch({type : "DELETE" ,payload:id})
  //   // setVideos(videos.filter((video) => video.id !== id));
  // }
  // const [videos,setVideo] = useState([])
  async function handleClick() {
    try {
      const response = await axios.get('./Data.json');
      console.log(response.data);
      // setVideo(response.data)
    } catch (error) {
      console.error('Error fetching JSON data:', error);
      
    }
  }
  
  useEffect(() => {
    handleClick()
  },[])
  
  return (
    <div className="main-container">
      <VideoContext.Provider value={videos}>
        <VideoDispatch.Provider value={dispatch}>
        <AddVideo editableVideo={editableVideo} />
        <Counter />
        <button onClick={()=> showSuspense ? setShowSuspense(false) : setShowSuspense(true) }>{showSuspense ? "Hide Suspense Data" : "Show Suspense Data"}</button>
        {showSuspense?
          <Suspense fallback={<>laading...</>}>
           
      
        <div className="item-container">
          {videos.map((video, index) => (
            <Video
              key={video.id}
              id={video.id}
              title={video.title}
              views={video.views}
              // deleteVideos={deleteVideos}
              editVideo={editVideo}
              index={index}
            />
          ))}
          
        </div>
        </Suspense>: null
        }
        </VideoDispatch.Provider>
      </VideoContext.Provider>
      {/* <button onClick={handleClick}>Add Titles More</button> */}
    </div>
  );
}

/*
import React, { useState } from "react";
import AddVideo from "./AddVideo";
import "./Style.css";
import Video from "./Video";
import videoDB from "./videoDB";

export default function Learn() {
  const [videos, setVideos] = useState(videoDB);
  const [editableVideo, setEditableVideo] = useState(null);

  function addVideos(video) {
    setVideos([...videos, { ...video, id: videos.length + 1 }]);
  }

  function editVideo(id, index) {
    setEditableVideo({ ...videos[index], index });
  }

  function updateVideo(video) {
    const updatedVideos = [...videos];
    updatedVideos[editableVideo.index] = video;
    setVideos(updatedVideos);
    setEditableVideo(null);
  }

  function deleteVideos(id) {
    setVideos(videos.filter((video) => video.id !== id));
  }

  return (
    <div className="main-container">
      <AddVideo
        addVideos={addVideos}
        updateVideos={updateVideo}
        editableVideo={editableVideo}
      />
      <div className="item-container">
        {videos.map((video, index) => (
          <Video
            key={video.id}
            id={video.id}
            title={video.title}
            views={video.views}
            deleteVideos={deleteVideos}
            editVideo={editVideo}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
*/
