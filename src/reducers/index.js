import { combineReducers } from "redux";
import listReducer from "./listsReducer";

const reducers = combineReducers({
  list: listReducer
})

export default reducers;