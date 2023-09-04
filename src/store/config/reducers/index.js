import { combineReducers } from "redux";

import uom from "./uom";
import category from "./category";
import subCategory from "./subCategory";
import stateProducts from "./stateProducts";
import inBoundType from "./inBoundType";
import outBoundType from "./outBoundType";

export default combineReducers({
  uom,
  category,
  subCategory,
  stateProducts,
  inBoundType,
  outBoundType,
});
