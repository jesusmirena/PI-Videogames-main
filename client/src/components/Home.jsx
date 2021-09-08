import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterVideogamesBy,
  getVideogames,
  filterCreated,
  orderByName,
  orderByRating,
} from "../actions";
import { Link } from "react-router-dom";
import Videogame from "./Videogame";
import Paging from "./Paging";
import SearchBar from "./SearchBar";
import imagen from "../../../videogame.png";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const [order, setOrder] = useState("");
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
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  function handleFilterBy(e) {
    dispatch(filterVideogamesBy(e.target.value));
  }
  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }
  function handleSortByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }
  function handleSortByRating(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }
  return (
    <div>
      <Link to="/Createvideogame">Crear un Videojuego</Link>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Mostrar todos los videojuegos
      </button>
      <div>
        <SearchBar />
        <select onChange={(e) => handleSortByName(e)}>
          <option value="Asc">A-Z</option>
          <option value="Desc">Z-A</option>
        </select>
        <select onChange={(e) => handleFilterBy(e)}>
          <option value="All">All</option>
          <option value="Action">Action</option>
          <option value="Indie">Indie</option>
          <option value="Adventure">Adventure</option>
          <option value="RPG">RPG</option>
          <option value="Strategy">Strategy</option>
          <option value="Shooter">Shooter</option>
          <option value="Casual">Casual</option>
          <option value="Simulation">Simulation</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Arcade">Arcade</option>
          <option value="Platformer">Platformer</option>
          <option value="Racing">Racing</option>
          <option value="Massively Multiplayer">Massively Multiplayer</option>
          <option value="Sports">Sports</option>
          <option value="Fighting">Fighting</option>
          <option value="Family">Family</option>
          <option value="Board Games">Board Games</option>
          <option value="Educational">Educational</option>
          <option value="Card">Card</option>
        </select>
        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="All">Todos</option>
          <option value="Created">Creados</option>
          <option value="Api">Existente</option>
        </select>
        <select onChange={(e) => handleSortByRating(e)}>
          <option value="All">Todos</option>
          <option value="High">Mayor puntuacion</option>
          <option value="Less">Menor puntuacion</option>
        </select>

        <Paging
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          paging={paging}
        />
        {currentVideogames &&
          currentVideogames.map((v) => {
            return (
              <div>
                <Videogame
                  id={v.id}
                  name={v.name}
                  key={v.id}
                  img={v.img}
                  genres={v.genres}
                  rating={v.rating}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
