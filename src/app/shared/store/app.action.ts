import { createAction, props } from "@ngrx/store";
import { Appstate } from "./appstate";

export const setAPIStatus = createAction(
    '[API] success or failure status',
    props<{apiStatus: Appstate}>()
);


export const setErrorMessage = createAction(
    '[API] success or failure status',
    props<{message: string}>()
);


