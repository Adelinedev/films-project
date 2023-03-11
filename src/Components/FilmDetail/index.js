import "./FilmDetail.css";

function FilmDetail(props) {
  const { selectedFilm } = props;

  return (
    <div className="FilmDetail is-hydrated">
      <figure className="film-backdrop">
        <img
          src={`https://image.tmdb.org/t/p/w1280/${selectedFilm.backdrop_path}`}
          alt={`${selectedFilm.title} backdrop`}
        />
        <h1 className="film-title">{selectedFilm.title}</h1>
      </figure>

      <div className="film-meta">
        <p className="film-detail-overview">
          <img
            src={`https://image.tmdb.org/t/p/w780/${selectedFilm.poster_path}`}
            className="film-detail-poster"
            alt={`${selectedFilm.title} poster`}
          />
          {selectedFilm.overview}
        </p>
      </div>
    </div>
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
