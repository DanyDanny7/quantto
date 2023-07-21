import { combineReducers } from "redux";

import inventary from "./inventary";
import inventaryActive from "./inventaryActive";

export default combineReducers({
  inventary,
  inventaryActive,
});
