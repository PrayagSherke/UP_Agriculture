import { createReducer, on } from "@ngrx/store";
import { Login } from "./login";
import { loginApiSuccess } from "./login.action";

export const initialState: ReadonlyArray<Login> = [];
export const loginReducer = createReducer(
  initialState,
  on(loginApiSuccess, (state, {login})=> {
    console.log(state)
    console.log(login)
   return {
    ...state,
    loginData: login
}
  })

)