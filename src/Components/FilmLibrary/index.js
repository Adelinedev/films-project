import "./FilmLibrary.css";
import FilmRow from "../FilmRow";

import SelectBox from "../SelectBox";
import { useState, useEffect } from "react";
import { useFilm } from "../../context/film-context";
import { Outlet } from "react-router-dom";

function FilmLibrary() {
  const { setShowPlayer, isVisible, setIsVisible, filmdata, setFilmdata } =
    useFilm();

  // set page 1 as initial page
  const [page, setPage] = useState(1);

  const [toggle, setToggle] = useState(false);
  // set 2023 as initial selectedOption
  const [selectedOption, setSelectedOption] = useState("2023");

  // select the year
  function handleOptionChange(e) {
    setSelectedOption(e.target.value);
    setFilmdata([]);
    localStorage.setItem("selectedYear", e.target.value);
  }
  // list of years
  const options = [
    { value: "2010", label: "2010" },
    { value: "2011", label: "2011" },
    { value: "2012", label: "2012" },
    { value: "2013", label: "2013" },
    { value: "2014", label: "2014" },
    { value: "2015", label: "2015" },
    { value: "2016", label: "2016" },
    { value: "2017", label: "2017" },
    { value: "2018", label: "2018" },
    { value: "2019", label: "2019" },
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
  ];

  const dataHandler = (e) => {
    setShowPlayer(false);
    setIsVisible(true);
  };

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
  const handleLoadMore = () => setPage(page + 1);
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

  useEffect(() => {
    const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    let initialYear;
    if (localStorage.getItem("selectedYear")) {
      initialYear = localStorage.getItem("selectedYear");
      setSelectedOption(initialYear);
    }
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&primary_release_year=${initialYear}`
    )
      .then((data) => data.json())
      .then((data) => data.results)
      .then((data) => data.map((item) => ({ ...item, isFave: false })))
      .then((data) => setFilmdata([...filmdata, ...data]));
  }, [selectedOption, page]);
  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
        {/* insert search box */}
        <div>
          <SelectBox
            selectedOption={selectedOption}
            options={options}
            onChange={handleOptionChange}
          />
          <p>Films of year {selectedOption}</p>
        </div>
        <div className="film-list-filters">
          <button onClick={showAllfilms} className="film-list-filter is-active">
            ALL
            <span className="section-count">{filmdata.length}</span>
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
        <button className="load-more" onClick={handleLoadMore}>
          Load more films
        </button>
      </div>

      <div className="film-details" style={{ display: isVisible && "block" }}>
        <h1 className="section-title">DETAILS</h1>
        <Outlet />
      </div>
    </div>
  );
}

export default FilmLibrary;
