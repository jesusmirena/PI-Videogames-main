const initialState = {
  videogames: [],
  allvideogames: [],
  platforms: [],
  videogameDetail: [],
  genres: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allvideogames: action.payload,
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "POST_VIDEOGAME": {
      return {
        ...state,
      };
    }
    case "FILTER_BY":
      const allvideogames = state.allvideogames;
      const filtered =
        action.payload === "All"
          ? allvideogames
          : allvideogames.filter((v) => v.genres);
      return {
        ...state,
        videogames: filtered,
      };
    case "GET_NAME_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
      };
      case "GET_VIDEOGAME_DETAIL": return {
        ...state,
        videogameDetail: action.payload
    }
    case "FILTER_CREATED":
      const createdFilter =
        action.payload === "Created"
          ? state.allvideogames.filter((v) => v.id.length > 10)
          : state.allvideogames.filter((v) => v.id.toString().length < 6);
      return {
        ...state,
        videogames:
          action.payload === "All" ? state.allvideogames : createdFilter,
      };
    case "ORDER_BY_NAME":
      let arraySort =
        action.payload === "Asc"
          ? state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: arraySort,
      };
    case "ORDER_BY_RATING":
      let arraySort1 =
        action.payload === "Less"
          ? state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: action.payload === "All" ? state.videogames : arraySort1,
      };
    default:
      return state;
  }
}

export default rootReducer;
