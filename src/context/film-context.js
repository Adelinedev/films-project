import { useState, createContext, useContext } from "react";
const initialData = {
  showPlayer: false,
};
export const FilmsContext = createContext(initialData);
export const FilmProvider = ({ children }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  // set details visible for smaller screens
  const [isVisible, setIsVisible] = useState(false);
  const [filmdata, setFilmdata] = useState([]);
  const [videoID, setVideoID] = useState();

  return (
    <FilmsContext.Provider
      value={{
        showPlayer,
        setShowPlayer,
        isVisible,
        setIsVisible,
        filmdata,
        setFilmdata,
        videoID,
        setVideoID,
      }}
    >
      {children}
    </FilmsContext.Provider>
  );
};
export const useFilm = () => useContext(FilmsContext);
