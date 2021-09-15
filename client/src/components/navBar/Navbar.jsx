import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByGenre,
  filterCreated,
  getGenres,
  orderByName,
  orderByRating,
  getPlatforms,
  filterByPlatform,
} from "../../actions";
import styles from "./navBar.module.scss";
import Dropdown from "./Dropdown";
import { GrMenu } from "react-icons/gr";
import { FiX } from "react-icons/fi";

export default function Navbar({
  handleFilterGenre,
  handleFilterPlatform,
  handleFilterCreated,
  handleSortByName,
  handleSortByRating,
}) {
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const [click, setClick] = useState(false);

  // function handleClick() {
  //   setClick(!click);
  // }

  return (
    <div>
      <nav className={styles.navigation}>
        <select
          className={styles.filters}
          onChange={(e) => handleSortByName(e)}
        >
          <option className={styles.options} selected="false" disabled>
            Order
          </option>
          <option className={styles.options} value="Asc">
            A-Z
          </option>
          <option className={styles.options} value="Desc">
            Z-A
          </option>
        </select>
        <select
          className={styles.filters}
          onChange={(e) => handleSortByRating(e)}
        >
          <option
            className={styles.options}
            selected={true}
            disabled="disabled"
            value=""
          >
            Rating
          </option>
          <option className={styles.options} value="All">
            Todos
          </option>
          <option className={styles.options} value="High">
            Mayor puntuacion
          </option>
          <option className={styles.options} value="Less">
            Menor puntuacion
          </option>
        </select>
        <select
          className={styles.filters}
          onChange={(e) => handleFilterGenre(e)}
          name="genres"
        >
          <option
            className={styles.options}
            selected={true}
            disabled="disabled"
            value=""
          >
            Choose a genre
          </option>
          <option className={styles.options} value="All">
            Todos
          </option>
          {genres &&
            genres.map((genre) => (
              <option
                className={styles.options}
                key={genre.id}
                value={genre.name}
              >
                {genre.name}
              </option>
            ))}
        </select>
        <select
          className={styles.filters}
          onChange={(e) => handleFilterPlatform(e)}
          name="platforms"
        >
          <option
            className={styles.options}
            selected={true}
            disabled="disabled"
            value=""
          >
            Choose a platform
          </option>
          <option className={styles.options} value="All">
            Todos
          </option>
          {platforms &&
            platforms.map((platform) => (
              <option
                className={styles.options}
                key={platform.id}
                value={platform.name}
              >
                {platform.name}
              </option>
            ))}
        </select>
        <select
          className={styles.filters}
          onChange={(e) => handleFilterCreated(e)}
        >
          <option className={styles.options} value="All">
            Todos
          </option>
          <option className={styles.options} value="Created">
            Creados
          </option>
          <option className={styles.options} value="Api">
            Existente
          </option>
        </select>
      </nav>
    </div>
  );
}
