import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../../redux/actions/index";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.scss";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameVideogames(name));
    setName("");
  }

  return (
    <div>
      <form
        className={styles.searchContainer}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className={styles.searchBox}>
          <input
            className={styles.searchInput}
            type="text"
            value={name}
            onChange={(e) => handleChange(e)}
            placeholder="Search..."
          />
          <button className={styles.searchButton} type="submit">
            <FaSearch size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}
