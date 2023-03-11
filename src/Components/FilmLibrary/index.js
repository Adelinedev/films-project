import FilmDetail, { FilmDetailEmpty } from "../FilmDetail";
import "./FilmLibrary.css";
import FilmRow from "../FilmRow";
import TMDB from "../../TMDB";
import { useState } from "react";

function FilmLibrary() {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [filmdata, setFilmdata] = useState(TMDB.films);
  const [toggle, setToggle] = useState(false);
  const dataHandler = (e) => setSelectedFilm(e);
  const idHandler = (e) => {
    const filteredfilmdata = [...filmdata];
    const favFilm = filteredfilmdata.map((item) => {
      if (item.id === e) {
        return { ...item, isFave: true };
      }
      return item;
    });
    setFilmdata(favFilm);
  };
  const removeidHandler = (e) => {
    const filteredfilmdata = [...filmdata];
    const favFilm = filteredfilmdata.map((item) => {
      if (item.id === e) {
        return { ...item, isFave: false };
      }
      return item;
    });
    setFilmdata(favFilm);
  };
  const showFavfilms = () => setToggle(true);
  const showAllfilms = () => setToggle(false);

  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
        <div className="film-list-filters">
          <button onClick={showAllfilms} className="film-list-filter is-active">
            ALL
            <span className="section-count">{TMDB.films.length}</span>
          </button>
          <button onClick={showFavfilms} className="film-list-filter">
            FAVES
            <span className="section-count">
              {filmdata.filter((item) => item.isFave === true).length}
            </span>
          </button>
        </div>
        {!toggle &&
          filmdata.map((items) => (
            <FilmRow
              {...items}
              dataHandler={dataHandler}
              idHandler={idHandler}
              key={items.id}
              removeidHandler={removeidHandler}
            />
          ))}
        {toggle &&
          filmdata
            .filter((item) => item.isFave === true)
            .map((items) => (
              <FilmRow
                {...items}
                dataHandler={dataHandler}
                idHandler={idHandler}
                key={items.id}
                removeidHandler={removeidHandler}
              />
            ))}
      </div>

      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
        {selectedFilm ? (
          <FilmDetail selectedFilm={selectedFilm} />
        ) : (
          <FilmDetailEmpty />
        )}
      </div>
    </div>
  );
}

export default FilmLibrary;
