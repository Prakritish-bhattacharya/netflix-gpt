import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  // custom Hook for Fetching TRAILER of movies
  useMovieTrailer(movieId);
  if (!trailerVideo?.key) return null;

  const videoUrl =
    "https://www.youtube.com/embed/" +
    trailerVideo.key +
    "?autoplay=1&mute=1&controls=0&loop=1&playlist=" +
    trailerVideo.key;

  return (
    <div className="">
      <iframe
        className="w-screen aspect-video"
        src={videoUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
    </div>
  );
};

export default VideoBackground;
