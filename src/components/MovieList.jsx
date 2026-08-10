import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  console.log(movies);
  // Wait until movies are available
  if (!movies || movies.length === 0) return;
  return (
    <div className="px-6 ">
      <h1 className="text-2xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex ">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
