import { GET_VIDEOGAME_DETAIL } from "../ActionNames/ActionNames";

const oneVideogameState = {
  videogameDetail: [],
};

const reducer = (state = oneVideogameState, action) => {
  switch (action.type) {
    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        videogameDetail: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
