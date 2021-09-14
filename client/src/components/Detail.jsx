import React, { useEffect } from "react";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail } from "../actions/index";
import styles from "./Detail.module.scss";
import { Spinner } from "./spinner";

export default function Detail(props) {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const videogameDetail = useSelector((state) => state.videogameDetail);

  useEffect(() => {
    dispatch(getVideogameDetail(id));
  }, [id, dispatch]);

  return (
    <div>
      <Link to="/home">
        <button className={styles.buttonBack}>Back</button>
      </Link>
      {videogameDetail ? (
        <div  className={styles.detailsContainer}>
          
          <img
          className={`${styles.col} ${styles.videogameImage}`}
            src={
              videogameDetail.background_image ||
              "https://myvideogamelist.com/assets/images/default.png"
            }
            alt=""
          />
          <div className={`${styles.col} ${styles.videogameDetails}`}>
            <p className={styles.firstItem}>
              <strong>Title:</strong> {videogameDetail.name}
            </p>
            <p>
              <strong>Genres:</strong>{" "}
              {videogameDetail.genres?.map((g) => g.name).join(", ")}
            </p>
            <p>
              <strong>Description:</strong>
              {videogameDetail.description_raw || videogameDetail.description}
            </p>
            <p>
              <strong>Platforms:</strong>
              {typeof videogameDetail.platforms === "string"
                ? videogameDetail.platforms.replace(/,\s*$/, "")
                : videogameDetail.platforms
                    ?.map((p) => p.platform.name)
                    .join(", ")}
            </p>
            <p>
              <strong>Release Date:</strong>
              {videogameDetail.released || "None"}
            </p>
            <p>
              <strong>Rating:</strong>★{videogameDetail.rating}
            </p>
          </div>
        </div>
      ) : (
        <Spinner/>
      )}
    </div>
  );
}
