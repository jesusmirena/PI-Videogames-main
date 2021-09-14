const initialState = {
  videogames: [],
  allvideogames: [],
  platforms: [],
  videogameDetail: [],
  genres: [],
  swap: true,
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
    case "GET_PLATFORMS":
      return {
        ...state,
        platforms: action.payload,
      };
    case "POST_VIDEOGAME": {
      return {
        ...state,
      };
    }
    case "FILTER_BY_GENRE":
      // state.swap = false;
      if ((state.swap = true)) {
        const filtrado =
          action.payload === "All"
            ? state.allvideogames
            : state.videogames.filter((g) => {
                return g.genres.find((g) => {
                  return g.name === action.payload;
                });
              });
        state.swap = false;
        return {
          ...state,
          videogames: filtrado,
        };
      } else {
        const filtrado =
          action.payload === "All"
            ? state.allvideogames
            : state.allvideogames.filter((g) => {
                return g.genres.find((g) => {
                  return g.name === action.payload;
                });
              });
        state.swap = true;
        return {
          ...state,
          videogames: filtrado,
        };
      }
    // case "FILTER_BY_PLATFORM": //ARREGLAR!!!!!!!!!!!!!!!
    //     const filtrados =
    //       action.payload === "All"
    //         ? state.allvideogames
    //         : state.allvideogames.filter((g) => {
    //             return g.platforms?.find((g) => {
    //               return g.name === action.payload;
    //             });
    //           });
    //     return {
    //       ...state,
    //       videogames: filtrados,
    //     };
    case "FILTER_CREATED":
      if (state.swap === false) {
        const createdFilter =
          action.payload === "Created"
            ? state.videogames.filter((v) => v.id.length > 10)
            : state.videogames.filter((v) => v.id.toString().length < 6);
        state.swap = true;
        return {
          ...state,
          videogames:
            action.payload === "All" ? state.allvideogames : createdFilter,
        };
      } else {
        const createdFilter =
          action.payload === "Created"
            ? state.allvideogames.filter((v) => v.id.length > 10)
            : state.allvideogames.filter((v) => v.id.toString().length < 6);
        state.swap = false;
        return {
          ...state,
          videogames:
            action.payload === "All" ? state.allvideogames : createdFilter,
        };
      }
    case "GET_NAME_VIDEOGAMES":
      if (action.payload.hasOwnProperty("alert")) {
        return alert("Your game hasn't been found");
      }
      return {
        ...state,
        videogames: action.payload,
      };
    case "GET_VIDEOGAME_DETAIL":
      return {
        ...state,
        videogameDetail: action.payload,
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
            console.log(state.videogames[0]);
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
