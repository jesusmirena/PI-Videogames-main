import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  filterByGenre,
  filterCreated,
  getGenres,
  orderByName,
  orderByRating,
  getPlatforms,
  resetVideogameDetail,
} from "../../redux/actions/index";

import Videogame from "../Videogame/Videogame";
import SearchBar from "../SearchBar/SearchBar";
import Header from "../header/header";
import Navbar from "../navBar/Navbar";
import styles from "./VideogamesGrid.module.scss";
import Pagination from "../Pagination/Pagination";

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

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
    dispatch(getPlatforms());
    dispatch(resetVideogameDetail());
  }, []);

  return (
    <div>
      <Header title="New and trending" />
      <div>
        <SearchBar />
        <Pagination
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          pagination={pagination}
        />
        <div className={styles.mainContainer}>
          <div className={styles.sidebar}>
            <Navbar
              handleFilterCreated={handleFilterCreated}
              handleSortByName={handleSortByName}
              handleSortByRating={handleSortByRating}
            />
          </div>
          <div>
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
          </div>
        </div>
        <Pagination
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          pagination={pagination}
        />
      </div>
    </div>
  );
}
