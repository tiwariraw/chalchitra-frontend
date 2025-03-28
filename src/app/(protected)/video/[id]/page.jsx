"use client";

import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

const VideoPage = () => {
  const { selectedMovie } = useSelector((state) => state.movie);
  return (
    <div>
      {" "}
      <ReactPlayer
        url={selectedMovie}
        playing={true}
        controls={true}
        className="player"
      />
    </div>
  );
};

export default VideoPage;
