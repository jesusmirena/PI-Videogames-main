import { combineReducers } from "redux";
import videogames from "./videogames";
import platforms from "./platforms";
import genres from "./genres";

export default combineReducers({
  videogames,
  platforms,
  genres,
});
