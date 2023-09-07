import { createReducer, on } from "@ngrx/store";
import { Home } from "./home";
import { homeApiSuccess } from "./home.action";

export const initialState: ReadonlyArray<Home> = [];
export const homeReducer = createReducer(
  initialState,
  on(homeApiSuccess, (state, {home})=> {
   return {
    ...state,
    homeData: home
}
  })

)