import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetFilters } from "../../redux/actions/index";
import styles from "./NavHeader.module.scss";

export default function NavHeader() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(resetFilters());
  }
  return (
    <div className={styles.barra}>
      <nav className={styles.navHeader}>
        <Link className={styles.navLink} to="/Createvideogame">
          Create your own videogame
        </Link>
        <button
          className={styles.navButton}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Reload all the videogames
        </button>
      </nav>
    </div>
  );
}
