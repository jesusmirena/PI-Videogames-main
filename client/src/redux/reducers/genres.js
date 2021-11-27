import { GET_GENRES } from "../ActionNames/ActionNames";

const genresState = {
  genres: [],
};

const reducer = (state = genresState, action) => {
  switch (action.type) {
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
