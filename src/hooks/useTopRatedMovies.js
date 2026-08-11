import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

// Custom Hook code
const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  // Memoization
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);

  const getTopRatedMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_OPTIONS,
    );
    const json = await data.json();

    // add json from movie slice
    dispatch(addTopRatedMovies(json.results)); // Add JSON to my movies Slice
  };
  // making API call
  useEffect(() => {
    if (!topRatedMovies) getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
