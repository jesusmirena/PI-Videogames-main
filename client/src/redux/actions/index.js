import axios from "axios";
import {
  FILTER_BY_GENRE,
  FILTER_BY_PLATFORM,
} from "../actionNames/ActionNames";

export function getVideogames() {
  return async function (dispatch) {
    var videogamesData = await axios.get(
      "http://localhost:3001/videogames",
      {}
    );
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: videogamesData.data,
    });
  };
}
export function getNameVideogames(name) {
  return async function (dispatch) {
    try {
      var namesData = await axios.get(
        "http://localhost:3001/videogames?name=" + name
      );
      return dispatch({
        type: "GET_NAME_VIDEOGAMES",
        payload: namesData.data,
      });
    } catch (error) {
      alert("The videogame hasn't been found :(");
    }
  };
}
export function getVideogameDetail(id) {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/videogame/${id}`);
    dispatch({ type: "GET_VIDEOGAME_DETAIL", payload: response.data });
  };
}
export function getGenres() {
  return async function (dispatch) {
    var genres = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: "GET_GENRES",
      payload: genres.data,
    });
  };
}
export function postVideogames(payload) {
  return async function (dispatch) {
    const data = await axios.post("http://localhost:3001/videogame", payload);
    return data;
  };
}

// export function filterByGenre(payload) {
//   return {
//     type: "FILTER_BY_GENRE",
//     payload,
//   };
// }

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}
export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}
export function orderByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload,
  };
}
export function getPlatforms() {
  return async function (dispatch) {
    const json = await axios.get(`http://localhost:3001/platforms`);
    return dispatch({ type: "GET_PLATFORMS", payload: json.data });
  };
}

export function getFilterByPlatforms(id) {
  return async function (dispatch) {
    const json = await axios.get(`http://localhost:3001/platforms/${id}`);
    return dispatch({ type: FILTER_BY_PLATFORM, payload: json.data });
  };
}

export function getFilterByGenres(name) {
  return async function (dispatch) {
    const json = await axios.get(`http://localhost:3001/genres/${name}`);
    return dispatch({ type: FILTER_BY_GENRE, payload: json.data });
  };
}
