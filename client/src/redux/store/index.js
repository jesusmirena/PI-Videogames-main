import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer";
import tryCatch from "../../middlewares/try-catch";

function errorHandler(error) {
  console.error(error);
}
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(tryCatch(errorHandler), thunk))
);
