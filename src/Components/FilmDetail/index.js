import "./FilmDetail.css";
import React, { useState } from "react";
import VideoPlayer from "../VideoPlayer";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useFilm } from "../../context/film-context";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import { useParams } from "react-router-dom";

function FilmDetail() {
  const {
    showPlayer,
    setShowPlayer,
    isVisible,
    setIsVisible,
    filmdata,
    videoID,
    setVideoID,
  } = useFilm();
  const params = useParams();

  const filteredFilm = filmdata.find(
    (item) => item.id.toString() === params.filmId
  );

  // set initial videoID

  // functions handling open and close the modal
  function handleOpenPlayer() {
    setShowPlayer(true);
    getYoutubeVideo();
  }

  function handleClosePlayer() {
    setShowPlayer(false);
  }

  // function to call the different videos from Youtube

  function getYoutubeVideo() {
    const API_KEY = process.env.REACT_APP_YTB_API_KEY;
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=${filteredFilm.title}&type=video&videoDefinition=high&maxResults=1&key=${API_KEY}`
    )
      .then((data) => data.json())
      .then((data) => data.items[0].id.videoId)
      .then((data) => setVideoID(data));
  }
  // set the state of button to close the film details

  function handleCloseDetail() {
    setIsVisible(false);
  }
  return (
    filteredFilm && (
      <>
        <div
          className="FilmDetail is-hydrated"
          style={{ display: !isVisible && "none" }}
        >
          <figure className="film-backdrop">
            <CloseTwoToneIcon
              onClick={handleCloseDetail}
              style={{
                color: "white",
                position: "absolute",
                right: "2px",
                zIndex: "50",
              }}
            />
            <img
              src={`https://image.tmdb.org/t/p/w1280/${filteredFilm.backdrop_path}`}
              alt={`${filteredFilm.title} backdrop`}
            />
            <span className="youtube-button" onClick={handleOpenPlayer}>
              <YouTubeIcon />
            </span>
            <h1 className="film-title">{filteredFilm.title}</h1>
          </figure>

          <div className="film-meta">
            <p className="film-detail-overview">
              <img
                src={`https://image.tmdb.org/t/p/w780/${filteredFilm.poster_path}`}
                className="film-detail-poster"
                alt={`${filteredFilm.title} poster`}
              />
              {filteredFilm.overview}
            </p>
          </div>
        </div>
        <div className="modal">
          {showPlayer && (
            <VideoPlayer src={videoID} onClose={handleClosePlayer} />
          )}
        </div>
      </>
    )
  );
}

export function FilmDetailEmpty() {
  return (
    <div className="FilmDetail">
      <p>
        <i className="material-icons">subscriptions</i>
        <span>No film selected</span>
      </p>
    </div>
  );
}

export default FilmDetail;
