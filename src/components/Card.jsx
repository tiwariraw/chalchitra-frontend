import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  setShowDialog,
  setClickedcard,
  fetchVideoDescription,
} from "../app/redux/slice/movieSlice";

const Card = ({ imageUrl, title, videoUrl, ele }) => {
  const dispatch = useDispatch();

  const handleVideo = async (video, image, ele) => {
    let res = {};
    if (!ele?.aiDescription) {
      res = dispatch(fetchVideoDescription(ele?._id));
    }
    if (res) {
      dispatch(setShowDialog(true));
      dispatch(setClickedcard(ele));
    }
  };

  return (
    <>
      <div
        className="card"
        onClick={() => handleVideo(videoUrl, imageUrl, ele)}
      >
        <div className="card-image-container">
          <Image
            src={imageUrl}
            alt={title}
            width={300}
            height={300}
            objectFit="cover"
            unoptimized
            className="card-img"
          />
          <h3 className="card-title">{title}</h3>
        </div>
      </div>
    </>
  );
};

export default Card;
