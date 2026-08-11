import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

// Custom Hook code
const usePopularMovies = () => {
  const dispatch = useDispatch();

  // Memoization
  const popularMovies = useSelector((store) => store.movies.popularMovies);

  
  const getPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_OPTIONS,
    );
    const json = await data.json();

    // add json from movie slice
    dispatch(addPopularMovies(json.results)); // Add JSON to my movies Slice
  };
  // making API call
  useEffect(() => {
    if (!popularMovies) getPopularMovies();
  }, []);
};

export default usePopularMovies;
