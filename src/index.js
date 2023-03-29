import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Components/App";
import { FilmProvider } from "./context/film-context";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FilmProvider>
        <App />
      </FilmProvider>
    </BrowserRouter>
  </React.StrictMode>
);
