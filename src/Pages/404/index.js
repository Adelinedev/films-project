import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-heading">404 - Page Not Found</h1>
        <p className="not-found-text">
          Sorry, the page you are looking for cannot be found.
        </p>
        <Link to="/" className="not-found-link">
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
