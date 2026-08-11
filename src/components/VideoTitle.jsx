import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-linear-to-r from-black">
      
      <h1 className=" text-2xl md:text-5xl font-bold">
        {title}
      </h1>

      <p className=" hidden md:inline-block py-6 text-lg w-2xl">
        {overview}
      </p>

      <div className="flex items-center gap-3 my-4 md:m-0">
        
        {/* Play Button */}
        <button
          className="flex items-center gap-1.5 bg-white text-black px-3 md:px-4 py-1 md:py-4 rounded-full font-semibold text-xl hover:bg-white/80 transition duration-200"
        >
          <span className="text-2xl leading-none">▶</span>
          <span>Play</span>
        </button>

        {/* More Info Button */}
        <button
          className=" hidden md:inline-block flex items-center gap-1.5 bg-gray-500/70 text-white px-4 py-3 rounded-full font-semibold text-xl hover:bg-gray-500/50 transition duration-200"
        >
          <span className="text-2xl leading-none">ⓘ</span>
          <span>More Info</span>
        </button>

      </div>
    </div>
  );
};

export default VideoTitle;