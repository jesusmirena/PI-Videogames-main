import GET_VIDEOGAMES from "../ActionNames"

const videogameState = {
    allVideogames = []
}

const reducer = (state = videogameState, action) => {
    switch (action.type) {
        case GET_VIDEOGAMES:
            return{
                ...state,
                allVideogames: action.payload
            }    
        default:
            break;
    }
};
