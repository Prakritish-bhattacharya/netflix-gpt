import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

// Custom Hook code
const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  // Memoization
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies,
  );

  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS,
    );
    const json = await data.json();

    // add json from movie slice
    dispatch(addNowPlayingMovies(json.results)); // Add JSON to my movies Slice
  };
  // making API call
  useEffect(() => {
    if (!nowPlayingMovies) getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
