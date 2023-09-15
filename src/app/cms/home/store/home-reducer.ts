import { createReducer, on } from "@ngrx/store";
import { homeApiSuccess } from "./home.action";

export const initialState: ReadonlyArray<any> = [];
export const homeReducer = createReducer(
  initialState
)