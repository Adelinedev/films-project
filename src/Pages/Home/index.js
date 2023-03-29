import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./homepage.css";
import Slider from "react-slick";

const Homepage = () => {
  const videoId = "o5F8MOz_IDw";

  return (
    <div className="homepage">
      <div className="video-container">
        <iframe
          title="background-video"
          src={`https://www.youtube.com/embed/${videoId}?controls=0&autoplay=1&mute=1&loop=1`}
        ></iframe>
      </div>
      <div className="content">
        <h1>Welcome to our Film Library</h1>
        <Link to="films" className="button">
          Explore All Films
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
