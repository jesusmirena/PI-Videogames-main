import { GET_PLATFORMS } from "../ActionNames/ActionNames";

const platformsState = {
  platforms: [],
};

const reducer = (state = platformsState, action) => {
  switch (action.type) {
    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
