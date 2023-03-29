import FilmLibrary from "../FilmLibrary";
import { Routes, Route } from "react-router-dom";
import Homepage from "../../Pages/Home";
import NotFound from "../../Pages/404";
import FilmDetail, { FilmDetailEmpty } from "../FilmDetail";
function App() {

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="films" element={<FilmLibrary />}>
        <Route index element={<FilmDetailEmpty />} />
        <Route path=":filmId" element={<FilmDetail />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
