import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  // Select one random movie
  // This selection remains stable during re-renders
  const mainMovie = useMemo(() => {
    if (!movies || movies.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * movies.length);

    return movies[randomIndex];
  }, [movies]);

  // Return only AFTER all hooks
  if (!mainMovie) {
    return null;
  }
  const { original_title, overview, id } = mainMovie;

  return (
    <div className=" pt-[30%] bg-black md:pt-0 ">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
