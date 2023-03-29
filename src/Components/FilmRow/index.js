import "./FilmRow.css";
import { useNavigate } from "react-router-dom";

const FilmRow = (props) => {
  const {
    title,
    release_date,
    poster_path,
    dataHandler,
    id,
    idHandler,
    removeidHandler,
    isFave,
  } = props;

  const navigate = useNavigate();
  function metadataHandler() {
    dataHandler(props);
    navigate(`/films/${id}`);
  }

  return (
    props.release_date && (
      <div className="FilmRow">
        <img
          src={`https://image.tmdb.org/t/p/w780/${poster_path}`}
          alt={`${title} film poster`}
        />
        <div className="film-summary">
          <h3>{title}</h3>
          <p>{release_date.slice(0, 4)}</p>
          <div className="actions">
            <button className="action">
              {isFave ? (
                <span
                  className="material-icons"
                  onClick={() => removeidHandler(id)}
                >
                  remove_from_queue
                </span>
              ) : (
                <span className="material-icons" onClick={() => idHandler(id)}>
                  add_to_queue
                </span>
              )}
            </button>
            <button className="action">
              <span className="material-icons" onClick={metadataHandler}>
                read_more
              </span>
            </button>
          </div>
        </div>
      </div>
    )
  );
};
export default FilmRow;
