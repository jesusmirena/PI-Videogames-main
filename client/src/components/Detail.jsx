import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail  } from "../actions/index";


export default function Detail(props) {
  const dispatch = useDispatch();
  // const params = useParams();
  // const { idVideogame } = params
  const {id} = props.match.params;
  const videogameDetail = useSelector(state => state.videogameDetail)

  useEffect(() => {
    dispatch(getVideogameDetail(id));
  }, [id, dispatch]);

  return (
    <div>
      {videogameDetail ? (
        <div>
          <h3>{videogameDetail.name}</h3>
          <img
            src={
              videogameDetail.background_image ||
              "https://myvideogamelist.com/assets/images/default.png"
            }
            alt=""
          />
          <p>{videogameDetail.description_raw || videogameDetail.description}</p>
          <p>{`Genres: ${videogameDetail.genres?.map((g) => g.name).join(", ")}`}</p>
          <p>{`Platforms: ${
            typeof videogameDetail.platforms === "string"
              ? videogameDetail.platforms
              : videogameDetail.platforms?.map((p) => p.platform.name).join(", ")
          }`}</p>
          <p>{`Release Date: ${videogameDetail.releaseDate || "None"}`}</p>
          <p>{`Rating: ★ ${videogameDetail.rating}`}</p>
        </div>
      ) : (
        <h1>Cargando</h1>
      )}
    </div>
  );
}
