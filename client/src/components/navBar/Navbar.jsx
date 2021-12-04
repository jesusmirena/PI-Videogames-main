import { useDispatch, useSelector } from "react-redux";
import { getFilterByPlatforms, getFilterByGenres } from "../../redux/actions";
import styles from "./navBar.module.scss";

export default function Navbar({
  handleFilterCreated,
  handleSortByName,
  handleSortByRating,
}) {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);

  function handleFilter(funcion, e) {
    dispatch(funcion(e.target.value));
  }

  return (
    <div>
      <aside className={styles.navigation}>
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
          onChange={(e) => handleFilter(getFilterByGenres, e)}
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

          {genres &&
            genres.map((genre) => (
              <option
                className={styles.options}
                key={genre.id}
                value={genre.name.toLowerCase()}
              >
                {genre.name}
              </option>
            ))}
        </select>
        <select
          className={styles.filters}
          onChange={(e) => handleFilter(getFilterByPlatforms, e)}
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
          {platforms &&
            platforms.map((platform) => (
              <option
                className={styles.options}
                key={platform.id}
                value={platform.id}
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
      </aside>
    </div>
  );
}
