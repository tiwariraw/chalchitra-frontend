"use client";
import React from "react";
import Slider from "react-slick";
import Card from "./Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VideoModal from "./videoModal";

function CardSlider({ allVideos }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <>
      <VideoModal />
      <div className="slider-container">
        <Slider {...settings}>
          {allVideos?.map((ele, index) => (
            <Card
              imageUrl={ele?.posterUrl}
              title={ele?.title}
              videoUrl={ele?.url}
              key={index}
              ele={ele}
            />
          ))}
        </Slider>
      </div>
    </>
  );
}

export default CardSlider;
