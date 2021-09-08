import axios from "axios";

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
      console.log(error);
    }
  };
}
export function getVideogameDetail(id) {
  return async function (dispatch) {
      const response = await axios.get(`http://localhost:3001/videogame/${id}`);
      dispatch({ type: "GET_VIDEOGAME_DETAIL", payload: response.data });
  }
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

export function filterVideogamesBy(payload) {
  return {
    type: "FILTER_BY",
    payload,
  };
}
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
