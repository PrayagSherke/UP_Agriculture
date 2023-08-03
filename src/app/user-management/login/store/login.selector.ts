import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoginState } from "./login.state"

const getLoginState = createFeatureSelector<LoginState>('Login')

export const getToken = createSelector(getLoginState, state => {
    return state.token ? state.token : undefined
})