import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import {
  getVideogames,
  filterByGenre,
  filterCreated,
  getGenres,
  orderByName,
  orderByRating,
  getPlatforms,
  filterByPlatform,
} from "../actions";
import { Link } from "react-router-dom";
import Videogame from "./Videogame";
import SearchBar from "./SearchBar";
import imagen from "../../../videogame.png";
import Header from "./header/header";
import Navbar from "./navBar/Navbar";
import styles from "./VideogamesGrid.module.scss";
import Pagination from "./Pagination";

export default function Home() {
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

  const [order, setOrder] = useState("");
  const [click, setClick] = useState(false);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, []);
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    dispatch(getVideogames());
  }, []);
  
  
  function handleFilterGenre(e) {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }
  function handleFilterPlatform(e) {
    e.preventDefault();
    dispatch(filterByPlatform(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }
  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }
  function handleSortByName(e) {
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }
  function handleSortByRating(e) {
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  return (
    <div>
      <Header title="New and trending" />
      <div>
        <Navbar
          handleFilterGenre={handleFilterGenre}
          handleFilterPlatform={handleFilterPlatform}
          handleFilterCreated={handleFilterCreated}
          handleSortByName={handleSortByName}
          handleSortByRating={handleSortByRating}
        />
        <SearchBar />
        <Pagination
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          pagination={pagination}
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
                  platforms={v.platforms}
                />
              );
            })}
        </ul>
        <Pagination
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          pagination={pagination}
        />
      </div>
    </div>
  );
}
// export default connect((store)=> ({videogames: store.}) )()