import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

// Custom Hook code
const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  const getTopRatedMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_OPTIONS,
    );
    const json = await data.json();
    console.log(json)

    // add json from movie slice
    dispatch(addTopRatedMovies(json.results)); // Add JSON to my movies Slice
  };
  // making API call
  useEffect(() => {
    getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
