import axios from "axios";
import { GET_VIDEOGAMES } from "../ActionNames/ActionNames";

export function getVideogames() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/videogames", {});
    return dispatch({
      type: GET_VIDEOGAMES,
      payload: response.data,
    });
  };
}
