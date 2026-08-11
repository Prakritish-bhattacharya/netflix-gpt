import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addUpComingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

// Custom Hook code
const useUpComingMovies = () => {
  const dispatch = useDispatch();

  // Memoization
  const upComingMovies = useSelector((store) => store.movies.upComingMovies);

  const getUpComingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      API_OPTIONS,
    );
    const json = await data.json();

    // add json from movie slice
    dispatch(addUpComingMovies(json.results)); // Add JSON to my movies Slice
  };
  // making API call
  useEffect(() => {
    if (!upComingMovies) getUpComingMovies();
  }, []);
};

export default useUpComingMovies;
