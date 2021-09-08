import React from "react";
import { Link } from "react-router-dom";

export default function Videogame({ name, img, genres, id, rating}) {
  let genero = genres.map((e) => e.name)
  return (
    <Link to={`/videogame/${id}`}>
    <div className="Videogame" id={id}>
      <h1>{name}</h1>
      <div>
        <img src={img} alt="Image not found" width="200px" height="250px"/>
        <p>Genres: {genero.join(", ")}</p>
        <p>Rating: {rating}</p>
      </div>
    </div>
    </Link>
  );
}
