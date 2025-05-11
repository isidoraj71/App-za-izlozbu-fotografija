import React from "react";
import { Link } from "react-router-dom";

function UmetnikPocetna() {
  return (
    <div className="container mt-5">
      <h2>Umetnička kontrolna tabla</h2>
      <p>Dobrodošli! Ovde možete upravljati vašim fotografijama.</p>
      <Link to="/umetnik/dodaj-fotografiju" className="btn btn-primary me-2">
        Dodaj novu fotografiju
      </Link>
      <Link to="/umetnik/moje-fotografije" className="btn btn-secondary">
        Pregledaj svoje fotografije
      </Link>
    </div>
  );
}

export default UmetnikPocetna;