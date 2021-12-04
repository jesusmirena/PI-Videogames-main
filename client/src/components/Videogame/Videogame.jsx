import React from "react";
import { Link } from "react-router-dom";
import styles from "./Videogame.module.scss";

export default function Videogame({
  name,
  img,
  genres,
  id,
  rating,
  platforms,
}) {
  let genero = genres.map((e) => e.name);
  let plataformas = platforms?.map((p) => p.name);

  return (
    <li id={id} className={styles.Videogame}>
      <div className={`${styles.cardItem} ${styles.CardItemUniqueEffect}`}>
        <img
          src={img || "https://m.media-amazon.com/images/I/611fcGzpVUL.jpg"}
          alt="Image not found"
        />
        <div className={styles.Content}>
          <Link to={`/videogame/${id}`}>
            <h2 className={styles.Title}>{name}</h2>
            <p className={styles.Genres}>Genres: {genero.join(", ")}</p>
            <p className={styles.Rating}>Rating: {rating}</p>
            <p className={styles.Genres}>Platforms: {plataformas.join(", ")}</p>
          </Link>
        </div>
      </div>
    </li>
  );
}
