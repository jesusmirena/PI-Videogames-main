import { combineReducers } from "redux";
import videogames from "./videogames";
import videogame from "./videogame";
import platforms from "./platforms";
import genres from "./genres";

export default combineReducers({
  videogame,
  videogames,
  platforms,
  genres,
});
