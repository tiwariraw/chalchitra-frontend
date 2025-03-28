"use client";
import React, { useEffect } from "react";
import HeroSection from "../../../components/HeroSection";
import CardSlider from "../../../components/CardSlider";
import { useDispatch, useSelector } from "react-redux";
import { fetchTvShows } from "../../redux/slice/movieSlice";
import Navbar from "@/components/Navbar";

const TvShows = () => {
  const dispatch = useDispatch();
  const { tvShows } = useSelector((state) => state.movie);
  const featuredMovie = {
    urlName: "Servant",
    title: "Servant",
    image:
      "https://chalchitra-s3-bucket.s3.us-east-1.amazonaws.com/posters/1742736617699-servant_poster.jpg",
    videoUrl:
      "https://chalchitra-s3-bucket.s3.us-east-1.amazonaws.com/videos/1742736617642-Servant.mp4",
    description:
      "A Philadelphia couple is in mourning after an unspeakable tragedy creates a rift in their marriage and opens the door for a mysterious force to enter their home.",
    genre: "Mystery",
    type: "TV Show",
  };

  useEffect(() => {
    dispatch(fetchTvShows("TV Show"));
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-black text-white min-h-screen">
        <HeroSection data={featuredMovie} />
        <div className="trending-head">Trending Now</div>
        <CardSlider allVideos={tvShows} />
      </div>
    </>
  );
};

export default TvShows;
