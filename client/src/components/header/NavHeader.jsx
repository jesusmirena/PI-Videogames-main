import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogames } from "../../actions";
import styles from "./NavHeader.module.scss";
export default function NavHeader() {
   const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getVideogames());
  }, []);
  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }
    return(
    <div className={styles.barra}>
          <nav className={styles.navHeader}>
          <Link  className={styles.navLink} to="/Createvideogame">Create your own videogame</Link>
        <button className={styles.navButton}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Reload all the videogames
        </button>
          </nav>
          </div>
    )
}