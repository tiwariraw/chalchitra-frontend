"use client";

import React, { useEffect } from "react";
import HeroSection from "../../../components/HeroSection";
import CardSlider from "../../../components/CardSlider";
import { useDispatch, useSelector } from "react-redux";
import { fetachMovies } from "../../redux/slice/movieSlice";
import Navbar from "@/components/Navbar";

const Movies = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movie);
  const featuredMovie = {
    urlName: "paradise",
    title: "Paradise",
    image:
      "https://chalchitra-s3-bucket.s3.us-east-1.amazonaws.com/posters/1742741137113-paradise_poster.jpg",
    videoUrl:
      "https://chalchitra-s3-bucket.s3.us-east-1.amazonaws.com/videos/1742741137000-Paradise.mp4",
    description:
      "A company develops a technology which makes it possible to transfer lifespans between people. When his wife loses 40 years of her life to pay for his debt, a man must find a way to get it back.",
    genre: "Mystery",
    type: "Movie",
  };

  useEffect(() => {
    dispatch(fetachMovies("Movie"));
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-black text-white min-h-screen">
        <HeroSection data={featuredMovie} />
        <div className="trending-head">Trending Now</div>
        <CardSlider allVideos={movies} />
      </div>
    </>
  );
};

export default Movies;
