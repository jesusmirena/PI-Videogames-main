import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { getVideogames } from "../actions";
import { Link } from "react-router-dom";
import Videogame from "./Videogame";
import Paging from "./Paging";
import SearchBar from "./SearchBar";
import imagen from "../../../videogame.png";
import Header from "./header/header";
import Navbar from "./navBar/Navbar";
import styles from "./VideogamesGrid.module.scss";

export function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    dispatch(getVideogames());
  }, []);
  useEffect(()=>{
    console.log("All videogames se actualizó");
  },[allVideogames])

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  return (
    <div>
      <Header title="New and trending" />
      <Link to="/Createvideogame">Crear un Videojuego</Link>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Mostrar todos los videojuegos
      </button>
      <div>
        <Navbar />
        <SearchBar />
        <Paging
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          paging={paging}
        />
        <ul className={styles.videogameGrid}>
          {currentVideogames &&
            currentVideogames.map((v) => {
              return (
                
                  <Videogame
                    id={v.id}
                    name={v.name}
                    key={v.id}
                    img={v.img}
                    genres={v.genres}
                    rating={v.rating}
                    // platforms={v.platforms}
                  />
               
              );
            })}
        </ul>
      </div>
    </div>
  );
}
