import { createReducer, on } from "@ngrx/store";
import { Login } from "./login.model";
import { loginApiSuccess } from "./login.action";

export const initialState: ReadonlyArray<Login> = [];
export const loginReducer = createReducer(
  initialState,
  on(loginApiSuccess, (state, {login})=> {
   return {
    ...state,
    loginData: login
}
  })

)