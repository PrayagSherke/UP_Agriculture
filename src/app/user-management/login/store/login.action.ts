import { createAction, props } from "@ngrx/store";
import { Login } from "./login.model";

export const invokeLoginAPI = createAction(
    '[Login API] invoke login API',
    props<{ login: Login }>()
)

export const loginApiSuccess = createAction(
    '[Login API] login API Success',
    props<{ login: Login }>()
)