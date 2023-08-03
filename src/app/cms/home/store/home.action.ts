import { createAction, props } from "@ngrx/store";
import { Home } from "./home";

export const invokeHomeAPI = createAction(
    '[Home API] invoke home API',
    props<{ home: Home }>()
)

export const homeApiSuccess = createAction(
    '[Home API] home API Success',
    props<{ home: Home }>()
)