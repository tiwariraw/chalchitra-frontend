"use client"; //Ensures the component runs in the browsers, important for redux and hooks

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../../../components/HeroSection";
import CardSlider from "../../../components/CardSlider";
import {
  fetchVideos,
  getAiRecommendationList,
  getWatchHistory,
} from "../../redux/slice/movieSlice";
import Navbar from "@/components/Navbar";

export default function Browse() {
  //dispatches an action the redux store
  const dispatch = useDispatch();
  const { allVideos, userWatchHistory, aiRecommendationList } = useSelector(
    (state) => state.movie
  );

  useEffect(() => {
    dispatch(fetchVideos());
    dispatch(getWatchHistory());
    dispatch(getAiRecommendationList());
  }, []);

  console.log(aiRecommendationList);

  const featuredMovie = {
    urlName: "Good Cop Bad Cop",
    title: "Good Cop Bad Cop",
    type: "TV Show",
    genre: "Comedy",
    image:
      "https://chalchitra-s3-bucket.s3.us-east-1.amazonaws.com/posters/1742738631087-good_cop_bad_cop_poster.jpg",
    videoUrl:
      "https://chalchitra-s3-bucket.s3.us-east-1.amazonaws.com/videos/1742738631030-Good+Cop_Bad+Cop.mp4",
    description:
      "Recounts detectives' pursuits to solve a complicated murder investigation with a startling twist: the perpetrator is a fellow member of law enforcement.",
  };

  const allMovies = allVideos?.filter((ele) => {
    return ele?.type == "Movie";
  });

  const allTvShows = allVideos?.filter((ele) => {
    return ele?.type == "TV Show";
  });

  return (
    <>
      <Navbar />

      <div className="bg-black text-white min-h-screen">
        <HeroSection data={featuredMovie} />

        <div className="trending-head">Trending Now</div>

        <CardSlider allVideos={allVideos} />

        {userWatchHistory?.length > 3 && (
          <>
            <div className="trending-head">continue watching...</div>
            <CardSlider allVideos={userWatchHistory} />
          </>
        )}

        {aiRecommendationList && aiRecommendationList?.length > 0 && (
          <>
            <div className="trending-head">Ai Recommendation List </div>
            <CardSlider allVideos={aiRecommendationList} />
          </>
        )}

        {allMovies && (
          <>
            <div className="trending-head">Movies</div>
            <CardSlider allVideos={allMovies} />
          </>
        )}

        {allTvShows && (
          <>
            <div className="trending-head">TV Shows </div>
            <CardSlider allVideos={allTvShows} />
          </>
        )}
      </div>
    </>
  );
}
